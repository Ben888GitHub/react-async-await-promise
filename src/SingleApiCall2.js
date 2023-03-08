import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const baseUrl = 'https://jsonplaceholder.typicode.com';

function SingleApiCall2() {
	const [posts, setPosts] = useState([]);
	const [isMounted, setIsMounted] = useState(true);
	const [showPosts, setShowPosts] = useState(false);

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
			<button onClick={() => setShowPosts(true)} data-testid="show-posts">
				Show API Data
			</button>
			{showPosts &&
				posts?.map((post, idx) => (
					<div data-testid="post-title" key={idx}>
						{post.title}
					</div>
				))}
			<div data-testid="post-title">qui est esse</div>
		</div>
	);
}

export default SingleApiCall2;
