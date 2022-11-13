import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

const baseUrl = 'https://jsonplaceholder.typicode.com';

function SingleApiCall() {
	const [posts, setPosts] = useState([]);
	const [isMounted, setIsMounted] = useState(true);

	const fetchPosts = useCallback(async () => {
		try {
			const { data: postsData } = await axios.get(`${baseUrl}/posts`);

			if (isMounted) {
				setPosts(postsData.slice(0, 10));
			}
		} catch (err) {
			console.error(err);
			return err;
		}
	}, [isMounted]);

	useEffect(() => {
		fetchPosts();

		// unmount the action to clean up side effects, for performance optimization
		return () => {
			setIsMounted(false);
		};
	}, [fetchPosts]);

	return (
		<div>
			{posts &&
				posts.map((post, idx) => (
					<div key={idx}>
						<h2>{post.id}</h2>
						<h3>{post.title}</h3>
					</div>
				))}
		</div>
	);
}

export default SingleApiCall;
