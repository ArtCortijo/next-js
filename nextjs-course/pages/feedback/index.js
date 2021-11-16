import { Fragment, useState } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback/index';

function FeedbackPage(props) {
	const [feedbackData, setFeedbackData] = useState();

	function loadFeedbackHandler(id) {
		fetch(`/api/feedback/${id}`)
			.then((response) => response.json())
			.then((data) => {
				setFeedbackData(data.feedback);
			}); // /api/some-feedback-id
	}
	return(
		<Fragment>
			{feedbackData && <p>{feedbackData.email}</p>}
			<ul>
				{props.feedbackItems.map(item => (
					<li key={item.id}>
						{item.text}{' '}
						<button onClick={loadFeedbackHandler.bind(null, item.id)}>Show details</button>
					</li>
				))}
			</ul>
		</Fragment>
	);
}

// We want to pre-render this page and pre-fetch the data for pre-rendering.
export async function getStaticProps() {
	// you should not use fetch inside of getStaticProps or getServerSideProps to talk to your own API. Instead since this is all part of one project and therefore ultimately all served by one server.WWhat you should do instead is write any note JS logic that should execute here directly inside of getStaticProps.

	const filePath = buildFeedbackPath();
	const data = extractFeedback(filePath);
	return {
		props: {
			feedbackItems: data
		}
	}
}

export default FeedbackPage;