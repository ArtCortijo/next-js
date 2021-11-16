import { buildFeedbackPath, extractFeedback } from './index';

function handler(req, res) {
	// if (req.method === 'POST') {
		// Do something different
	// }
	// we need to know which concrete value was encoded in the URL as a value for this placeholder. And we can get access to that again, through this request object which we should accept together with that response object.
	const feedbackId = req.query.feedbackId;
	const filePath = buildFeedbackPath();
	const feedbackData = extractFeedback(filePath);
	const selectedFeedback = feedbackData.find((feedback) => feedback.id === feedbackId);
	res.status(200).json({
		feedback: selectedFeedback
	});
}

export default handler;

// /api/feedback/id