<script>
	import _ from 'lodash'

	export let name;

	let disabled = false;

	let selectedCategory;
	let selectedDifficulty;
	let answer;
	let correct = 0
	let incorrect = 0
	let APIURL = ''

	let questions = []
	
	let difficultys = [
		{ id: 1, text: `easy` },
		{ id: 2, text: `medium` },
		{ id: 3, text: `hard` }
	];
	
	let categorys = [
		{
			id: 1,
			text: `General Knowledge`,
			value: `9`,
		},
		{
		id: 2, 
		text: `Books`,
		value: `10`
		},
		{
		id: 3, 
		text: `Film`,
		value: `11`
		},
		{
		id: 4, 
		text: `Music`,
		value: `12`
		},
		{
		id: 5, 
		text: `Television`,
		value: `14`
		},
	];
	
	
	async function getQuestions(url) {
		const response = await fetch(url)
		let data = await response.json()

		questions = data.results

		let questionResults = []

		questions = questions.map((apiQuestion) => {
			const question = {
				question: apiQuestion.question,
				correct_answer: apiQuestion.correct_answer,
				has_answered: false
			}

			const answers = [...apiQuestion.incorrect_answers];

			question.answer = Math.floor(Math.random() * 3) + 1;

			answers.splice( question.answer - 1, 0, apiQuestion.correct_answer);

			answers.forEach((choice, i) => {
				question['choice_' + (i + 1)] = choice;
			})
				questionResults.push(question)
			}
			// end of map
		)
		questions = questionResults
	}
	
	function handleSubmit() {
		disabled = false;
		APIURL = `https://opentdb.com/api.php?amount=1&category=${selectedCategory.value}&difficulty=${selectedDifficulty.text}&type=multiple`
		getQuestions(APIURL)
	}


	function checkAnswer(choice, correctAnswer, answered) {
		disabled = true;
		if (choice === correctAnswer) {
			correct ++
		} else {
			incorrect ++
		}
	}
	
	
	</script>
	
	<main>
		<h1>{name}!</h1>
	
		<form on:submit|preventDefault={handleSubmit} class="game-settings">
			<select bind:value={selectedCategory} on:blur="{() => answer = ''}">
				{#each categorys as category}
					<option value={category}>
						{category.text}
					</option>
				{/each}
			</select>
	
			<select bind:value={selectedDifficulty} on:blur="{() => answer = ''}">
				{#each difficultys as difficulty}
					<option value={difficulty}>
						{difficulty.text}
					</option>
				{/each}
			</select>
		
			<button type=submit>Start</button>
	
		</form>
	
		<div class="results">
			<p>Correct: { correct }</p>
			<p>Incorrect: { incorrect }</p>
		</div>
	
		<div>
			{#each questions as question}
			<div class="question_card">
				<h3 class="question"> {@html _.unescape(question.question)}	</h3>
				<button disabled={disabled} on:click={checkAnswer(question.choice_1, question.correct_answer, question.has_answered)}> {@html _.unescape(question.choice_1)}</button>
				<button disabled={disabled} on:click={checkAnswer(question.choice_2, question.correct_answer, question.has_answered)}> {@html _.unescape(question.choice_2)}</button>
				<button disabled={disabled} on:click={checkAnswer(question.choice_3, question.correct_answer, question.has_answered)}> {@html _.unescape(question.choice_3)}</button>
				<button disabled={disabled} on:click={checkAnswer(question.choice_4, question.correct_answer, question.has_answered)}> {@html _.unescape(question.choice_4)}</button>
				<!-- <p>{ question.answer }</p>
				<p>{ feedback }</p> -->
			</div>
	
			<form on:submit|preventDefault={handleSubmit}>			
				<button class="submit" type=submit>Next</button>
			</form>

			{:else}
				<!-- this block renders when photos.length === 0 -->
				<p>Shall we play a game?</p>
			{/each}
		</div>
	
	</main>
	
	<style>
		main {
			width: 450px;
			margin: 0 auto;
			padding: 1em;
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.game-settings {
			width: 100%;
		}

		.game-settings select{
			width: 46%;
			margin: .25rem;
			padding: .75rem;
			border-radius: 5px;
			color: rgb(48, 48, 48);
			font-size: 14px;
		}

		.game-settings button{
			width: 95%;
			margin: .5rem;
			padding: .75rem;
			text-transform: uppercase;
		}

		.results {
			display: flex;
			justify-content: center;
		}

		.results p {
			margin: 1rem;
		}

		h1 {
			color: #ff3e00;
			text-transform: uppercase;
			font-size: 4em;
			font-weight: 100;
		}
	
		/* @media (min-width: 640px) {
			main {
				border: solid orange;
			}
		} */
	
		.question_card {
			width: 100%;
			margin-bottom: 2rem;
			margin-top: 1rem;
		}

		.question_card h3 {
			font-weight: 600;
		}

		.submit {
			color: white;
			background-color:#ff3e00;
			width: 33%;
			border-radius: 20px;
		}
	
		button {
			margin: 5px auto;
			background-color: white;
			width: 400px;
			padding: 1rem;
			border-radius: 5px;
			border: none;
			box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
			transition: all 0.3s cubic-bezier(.25,.8,.25,1);
		}
	
		button:hover {
			box-shadow: 0 2px 4px rgba(0,0,0,0.25), 0 2px 3px rgba(0,0,0,0.22);
		}
	</style>