<script>
	import _ from 'lodash'

	export let name;

	let disabled = false;

	let selectedCategory;
	let selectedDifficulty;
	let answer;
	let feedback = ''
	let correct = 0
	let incorrect = 0
	
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
	
		let questions = []
		
		let APIURL = ''
	
		async function getQuestions(url) {
			const response = await fetch(url)
			let data = await response.json()
	
			questions = data.results
	
			let questionResults = []
	
			questions = questions.map((apiQuestion) => {
				const question = {
					// question: apiQuestion.question.replace(/&#039;/g, " ").replace(/&quot;/g, `"`).replace(/&rsquo;/g, `'`).replace(/&amp;/g, '&'),
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
			console.log(questions)
		}
	
	function handleSubmit() {
		disabled = false;
		console.log(`category: ${selectedCategory.value}`)
		console.log(`difficulty: ${selectedDifficulty.text}`)
		APIURL = `https://opentdb.com/api.php?amount=1&category=${selectedCategory.value}&difficulty=${selectedDifficulty.text}&type=multiple`
		getQuestions(APIURL)
	}
	
	function checkAnswer(choice, correctAnswer, answered) {
		disabled = true;

		if (choice === correctAnswer) {
			console.log(correctAnswer)
			feedback = 'you got it!'
			correct ++
		} else {
			console.log(choice)
			feedback = 'WRONG!'
			incorrect ++
		}
	}
	
	
	</script>
	
	<main>
		<h1>Hello {name}!</h1>
	
		<form on:submit|preventDefault={handleSubmit}>
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
		
		
			<button type=submit>
				Submit
			</button>
	
		</form>
	
		<p>correct: { correct }</p>
		<p>incorrect: { incorrect }</p>
	
		<div>
			{#each questions as question}
			<div class="question_card">
				<h3 class="question"> {@html _.unescape(question.question)}	</h3>
				<button disabled={disabled} on:click={checkAnswer(question.choice_1, question.correct_answer, question.has_answered)}> {@html _.unescape(question.choice_1)}</button>
				<button disabled={disabled} on:click={checkAnswer(question.choice_2, question.correct_answer, question.has_answered)}> {@html _.unescape(question.choice_2)}</button>
				<button disabled={disabled} on:click={checkAnswer(question.choice_3, question.correct_answer, question.has_answered)}> {@html _.unescape(question.choice_3)}</button>
				<button disabled={disabled} on:click={checkAnswer(question.choice_4, question.correct_answer, question.has_answered)}> {@html _.unescape(question.choice_4)}</button>
				<p>{ question.answer }</p>
				<p>{ feedback }</p>
			</div>
	
			<form on:submit|preventDefault={handleSubmit}>			
				<button type=submit>
						Submit
					</button>
			</form>
			{:else}
				<!-- this block renders when photos.length === 0 -->
				<p>Shall we play a game?</p>
			{/each}
		</div>
	
	</main>
	
	<style>
		main {
			text-align: center;
			padding: 1em;
			max-width: 240px;
			margin: 0 auto;
		}
	
		h1 {
			color: #ff3e00;
			text-transform: uppercase;
			font-size: 4em;
			font-weight: 100;
		}
	
		@media (min-width: 640px) {
			main {
				max-width: none;
			}
		}
/* 	
		.question_card {
			border: solid red;
		} */
	
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