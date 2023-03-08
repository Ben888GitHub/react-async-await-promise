import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import nock from 'nock';
import '@testing-library/jest-dom';
import SingleApiCall2 from './SingleApiCall2';
import axiosMock from 'axios';

jest.mock('axios');

const fakePosts = [
	{
		userId: 1,
		id: 1,
		title:
			'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
	},
	{ userId: 1, id: 2, title: 'qui est esse' },
	{ userId: 1, id: 4, title: 'eum et est occaecati' }
];

test('renders learn react link', async () => {
	// const scope = nock('https://jsonplaceholder.typicode.com')
	// 	.get('/posts')
	// 	.once()
	// 	.reply(200, {
	// 		data: fakePosts
	// 	});

	render(<SingleApiCall2 />);

	axiosMock.get.mockResolvedValueOnce({
		data: fakePosts
	});

	const showPostBtn = await screen.findByRole('button');
	await fireEvent.click(showPostBtn);

	// expect(screen.getByTestId('post-title')).toHaveTextContent('qui est esse');
	// await waitFor(() => screen.findByTestId('post-title'), { timeout: 4000 });

	// const postsTitle = await screen.getByTestId('post-title');
	// expect(postsTitle).toHaveTextContent('qui est esse');
	// expect(await screen.findByText('qui est esse')).toBeInTheDocument();
	// const postTitle = await screen.getByTestId('post-title');

	// expect(await screen.getByText('qui est esse')).toBeInTheDocument();

	// expect(screen.getByTestId('post-title')).toHaveTextContent('qui est esse');
	expect(axiosMock.get).toHaveBeenCalledTimes(1);
	expect(axiosMock.get).toHaveBeenCalledWith(
		'https://jsonplaceholder.typicode.com/posts'
	);
	// await waitFor(() => screen.findByTestId('post-title'), { timeout: 4000 });
	expect(await screen.findByText('qui est esse')).toBeInTheDocument();
});
