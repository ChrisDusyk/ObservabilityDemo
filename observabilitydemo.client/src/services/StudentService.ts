import { Student } from "../models/Student";

export const getStudent = async (id: number): Promise<Student | null> => {
  const response = await fetch(`/api/students/${id}`);
  if (!response.ok) {
    return null;
  }

  const student: Student = await response.json();
  return student;
};

export const updateStudent = async (student: Student): Promise<Student> => {
  const response = await fetch(`/api/students/${student.id}`, {
    method: "PUT",
    body: JSON.stringify(student),
	headers: { "Content-Type": "application/json" }
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return student;
};
