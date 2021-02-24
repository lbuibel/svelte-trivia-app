<script>
// import { timeStamp } from "console";

	export let name;
	let questions = []
	
	// get car trivia question from api
	fetch('https://opentdb.com/api.php?amount=1&category=11&difficulty=easy&type=multiple')
		.then((res) => {
			return res.json();
			})
			.then((res) => {
			// iterating through results array and transforming the results into a question object
			questions = res.results.map((apiQuestion) => {
				const question = {
					question: apiQuestion.question.replace(/&#039;/g, " ").replace(/&quot;/g, `"`).replace(/&rsquo;/g, `'`).replace(/&amp;/g, '&'), // results in each individual question object
				};

				// creating an array of incorrect answers to be added to the question object
				const answers = [...apiQuestion.incorrect_answers];
				// generate a random number between 0 and 3

				// used to randomly place correct answer in the answers array
				question.answer = Math.floor(Math.random() * 3) + 1;
				answers.splice( question.answer - 1, 0, apiQuestion.correct_answer);

				// iterate through answers and give them an index
				answers.forEach((choice, i) => {
					question['choice_' + (i + 1)] = choice;
				});
				questions.push(question)
				console.log(questions)
				return question;
			});
		})
		.catch((err) => {
			console.error(err);
	});


</script>

<main>
	<h1>{name}!</h1>

		{#each questions as question}
		<div class="questions">
			<p class="question"> {question.question}</p>
			<button> {question.choice_1}</button>
			<button> {question.choice_2}</button>
			<button> {question.choice_3}</button>
			<button> {question.choice_4}</button>
			<p>{question.answer}</p>
		</div>
		{/each}
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

	@media (min-width: 340px) {
		main {
			max-width: none;
		}
	}
	.question {
		font-size: 1.5rem;
		font-weight: 200;
	}

	.questions {
		display: flex;
		flex-direction: column;
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