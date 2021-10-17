function userIdPage(props) {
  return (
    <h1>{props.username}</h1>
  )
}

export default userIdPage;

export async function getServerSideProps(context) {
  // req and res are default node objects
  const { params, req, res } = context;
  console.log(req);
  console.log(res);

  const userId = params.userId;

  return {
    props: {
      username: `userid-${userId}`
    }
  };
}