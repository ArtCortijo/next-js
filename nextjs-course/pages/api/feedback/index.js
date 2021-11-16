// import the file system Node.js module
// we can use Node.js code here because this will run on the server
import fs from 'fs';
import path from 'path';

export function buildFeedbackPath() {
	return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractFeedback(filePath) {
	const fileData = fs.readFileSync(filePath);
	const data = JSON.parse(fileData);
	return data;
}

// Because this file is in the API folder, next.js will kind of take this function here to execute it for incoming requests sent to /API/feedback.
// Instead, this allows us to execute any server side code of our choice and that's important server side code. Any code we write in here, will never end up in any client side code bundle. So any code we write here will never be exposed to visitors of our webpage,
// Inside of the API FileSystemDirectoryReader, any file will not export a react component
// test on http://localhost:3000/api/feedback
function handler (req, res) {
	if(req.method === 'POST') {
		const email = req.body.email;
		const feedBackText = req.body.text;
		const newFeedback = {
			id: new Date().toISOString(),
			email: email,
			text: feedBackText,
		};

		// Store it in a database or file
		// store it in a file by constructing a path with the join method to that data folder and there the feedback.json file by getting access to the current working directory with process current working directory, which will refer to the overall project directory. Then diving into data and then into feedback.json
		const filePath = buildFeedbackPath();
		const data = extractFeedback(filePath);
		data.push(newFeedback); 
		fs.writeFileSync(filePath, JSON.stringify(data));
		res.status(201).json({ message: 'Success yo!', feedback: newFeedback })
	} else {
		const filePath = buildFeedbackPath();
		const data = extractFeedback(filePath);
		res.status(200).json({ feedback: data });
	}
}

export default handler;