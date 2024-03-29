import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

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
			console.error('error');
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
			<h1>Posts</h1>
			{posts &&
				posts.map((post, idx) => (
					<div key={idx}>
						<h2>{post.id}</h2>
						<h3 data-testid="post-title">{post.title}</h3>
					</div>
				))}
		</div>
	);
}

export default SingleApiCall;
