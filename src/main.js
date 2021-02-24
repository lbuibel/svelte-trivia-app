import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Movie Trivia'
	}
});

export default app;