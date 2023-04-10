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
		const [postsList, todosList] = await Promise.all([postsData, todosData]);

		if (isMounted) {
			// * normal way to update state
			setPosts(postsList.data.slice(0, 3));
			setTodos(todosList.data.slice(0, 3));

			// * more recommended way to update array state when Create or Update
			// setPosts((prevPosts) => [...prevPosts, posts?.data?.slice(0, 3)]);
			// setTodos((prevTodos) => [...prevTodos, todos.data.slice(0, 3)]);
			// * resource from: https://dev.to/codux/react-lessons-from-the-trenches-useeffect-x-infinity-1e3d
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
				posts?.map((post, idx) => (
					<div key={idx}>
						<h2>{post.id}</h2>
						<h3>{post.title}</h3>
					</div>
				))}

			<br />
			<h1>Todos</h1>
			{todos &&
				todos?.map((todo, idx) => (
					<div key={idx}>
						<h2>{todo.id}</h2>
						<h3>{todo.title}</h3>
					</div>
				))}
		</>
	);
}

export default MultipleApiCalls;
