// useRouter is a Next hook : If you want to access the router object inside any function component in your app, you can use the useRouter hook.
import { useRouter } from 'next/router';

function PortfolioProjectPage () {
    const router = useRouter();
    console.log(router.query);

    // send a request to some backend server to fetch the piece of data with an id of router.query.projectid

    return (
        <div>
            <h1>The Portfolio Project Page</h1>
        </div>
    )
}

export default PortfolioProjectPage;