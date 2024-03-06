import { useEffect, useState } from "react";
import {
  HStack,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  IconButton,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
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
  };

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
              {students.map((s) => (
                <Tr key={s.id}>
                  <Td>{s.id}</Td>
                  <Td>{`${s.lastName}, ${s.firstName}`}</Td>
                  <Td>
                    <HStack spacing={5}>
                      <IconButton
                        as={NavLink}
                        icon={<FaEdit />}
                        to={`${s.id}`}
                        aria-label={`Edit ${s.firstName}'s record`}
                        bg="transparent"
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default StudentList;
