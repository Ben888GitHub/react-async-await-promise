import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

const baseUrl = 'https://jsonplaceholder.typicode.com';

function MultipleApiCalls() {
	const [posts, setPosts] = useState([]);
	const [todos, setTodos] = useState([]);
	const [isMounted, setIsMounted] = useState(true);

	const fetchDataPromiseAll = useCallback(async () => {
		const postsData = axios.get(`${baseUrl}/posts`);
		const todosData = axios.get(`${baseUrl}/todos`);

		// fetch API in parallel
		const [posts, todos] = await Promise.all([postsData, todosData]);

		if (isMounted) {
			setPosts(posts.data.slice(0, 3));
			setTodos(todos.data.slice(0, 3));
		}
	}, [isMounted]);

	useEffect(() => {
		fetchDataPromiseAll();

		// unmount the action to clean up side effects, for performance optimization
		return () => {
			setIsMounted(false);
		};
	}, [fetchDataPromiseAll]);

	return (
		<>
			<h1>Posts</h1>

			{posts &&
				posts.map((post, idx) => (
					<div key={idx}>
						<h2>{post.id}</h2>
						<h3>{post.title}</h3>
					</div>
				))}

			<br />
			<h1>Todos</h1>
			{todos &&
				todos.map((todo, idx) => (
					<div key={idx}>
						<h2>{todo.id}</h2>
						<h3>{todo.title}</h3>
					</div>
				))}
		</>
	);
}

export default MultipleApiCalls;
