import { useEffect, useState } from 'react';
import './App.css';

interface TestTable {
    id: number;
    title: string;
    createdDate: Date;
}

function App() {
    const [data, setData] = useState<TestTable[]>([]);

    useEffect(() => {
        populateData();
    }, []);

    const contents = data === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th><strong>ID</strong></th>
                    <th>Title</th>
                    <th>Created Date</th>
                </tr>
            </thead>
            <tbody>
                {data.map(datum =>
                    <tr key={datum.id}>
                        <td>{datum.id}</td>
                        <td>{datum.title}</td>
                        <td>{datum.createdDate.toString()}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function populateData() {
        const response = await fetch('api/test');
        const data = await response.json();
        setData(data);
    }
}

export default App;