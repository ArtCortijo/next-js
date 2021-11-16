import { useRef, useState } from 'react';

function HomePage() {
	const [feedbackItems, setFeedbackItems] = useState([]);
	const emailInputRef = useRef();
	const feedbackInputRef = useRef();

	function submitFormHandler(e) {
		e.preventDefault();
		const enteredEmail = emailInputRef.current.value;
		const enteredFeedback = feedbackInputRef.current.value;

		const reqBody = { email: enteredEmail, text: enteredFeedback };

		// We don't need to encode our current domain here because if we start with a slash here this will automatically be appended as a absolute path right after our domain.
		fetch('/api/feedback',{ 
			method: 'POST', 
			body: JSON.stringify(reqBody), 
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then((data) => console.log(data)); // {email: 'test@testotest.com, text: 'Some feedback text' }
	}

	function loadFeedbackHandler() {
		fetch('/api/feedback') // this is basically a GET request
			.then(response => response.json())
			.then((data) => {
				setFeedbackItems(data.feedback);
			});
	}

	return (
		<div>
			<h1>The Home Page</h1>
			<form onSubmit={submitFormHandler}>
				<div>
					<label htmlFor="email">Your email address</label>
					<input type="email" id="email" ref={emailInputRef} />
				</div>
				<div>
					<label htmlFor="feedback">Your feedback</label>
					<textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
				</div>
				<button>Send feedback</button>
			</form>
			<hr />
			<button onClick={loadFeedbackHandler}>Load Feedback</button>
			<ul>
				{feedbackItems.map(item => <li key={item.id}>{item.text}</li>)}
			</ul>
		</div>
	);
}

export default HomePage;
