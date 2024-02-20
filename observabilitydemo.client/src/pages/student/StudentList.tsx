import { useEffect, useState } from "react";
import { Table, TableContainer, Thead, Tbody, Th, Tr, Td } from "@chakra-ui/react";
import { Student } from "../../models/Student";

function StudentList() {
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        populateData();
    }, []);

    const populateData = async () => {
        const response = await fetch("/api/Students");
        const data: Student[] = await response.json();
        setStudents(data);
    }

    return (
        <>
            {students.length > 0 ? (
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Name</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {students.map(s => <Tr key={s.id}>
                                <Td>{s.id}</Td>
                                <Td>{`${s.lastName}, ${s.firstName}`}</Td>
                                <Td>Commands</Td>
                            </Tr>)}
                        </Tbody>
                    </Table>
                </TableContainer>
            ) : (
                <div>Loading...</div>
            )
            }
        </>
    );
}

export default StudentList;