import { useRouter } from 'next/router';

function ClientProjectsPage() {
    const router = useRouter();
    console.log(router.query);

    function loadProjectHandler () {
        // load data...

        // Navigating programmatically
        //the push method to navigate to a different page
        router.push('/clients/arturo/projecta');
        // or
        // router.push({
        //     pathname: '/clients/[id]/[clientprojectid]',
        //     query: {id: 'arturo', clientprojectid: 'projecta'}
        // });

    }
    
    return (
        <div>
            <h1>The Projects of a Given File</h1>
            <button onClick={loadProjectHandler}>Load project A</button>
        </div>
    )
}

export default ClientProjectsPage;