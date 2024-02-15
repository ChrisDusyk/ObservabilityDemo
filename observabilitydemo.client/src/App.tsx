import { useEffect, useState } from 'react';
import './App.css';
import { Student } from './models/Student';

function App() {
    const [student, setStudent] = useState<Student>();

    useEffect(() => {
        populateData();
    }, []);

    const contents = student === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div>
            <div>
                <label id="id">ID</label>
                <span aria-labelledby="id">{student.id}</span>
            </div>
            <div>
                <label id="name">Name</label>
                <span aria-labelledby="name">{`${student.lastName}, ${student.firstName}`}</span>
            </div>
            <div>
                <label id="classes">Classes</label>
                <span aria-aria-labelledby="classes">
                    <ul>
                        {student.enrollments.map(stu => <li key={stu.id}>{`${stu.course.id}: ${stu.course.title}`}</li>)}
                    </ul>
                </span>
            </div>
        </div>

    return (
        <div>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function populateData() {
        const response = await fetch('api/student/1');
        const data = await response.json();
        setStudent(data);
    }
}

export default App;