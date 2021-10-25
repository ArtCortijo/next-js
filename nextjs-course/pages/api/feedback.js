// Inside of the API FileSystemDirectoryReader, any file will not export a react component
function handler (req, res) {
  res.status(200).json({ message: 'it works!' });
}

export default handler;