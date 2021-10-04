import Link from 'next/link';

function ClientsPage () {
    // getting the data from a database for example
    const clients = [
        {id: "arturo", name: "Arturo"},
        {id: "peter", name: "Peter"},
    ]
    return (
        <div>
            <h1>The Client's Page</h1>
            <ul>
				{clients.map((client) => (
                    <li key={client.id}>
                        <Link href={`clients/${client.id}`}>{client.name}</Link>
                        {/* Alternative way for href, instead of a string (like above) you can provide an object */}
                        <Link href={{
                            pathname: '/clients/[id]',
                            query: {id: client.id}
                        }}>{client.name}</Link>
                    </li>
                ))}
			</ul>
        </div>
    )
}

export default ClientsPage;