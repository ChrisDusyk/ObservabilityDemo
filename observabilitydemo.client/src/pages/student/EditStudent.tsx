import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { LoaderFunctionArgs, NavLink, useLoaderData } from "react-router-dom";
import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikErrors,
  FormikProps,
} from "formik";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { FaAngleLeft } from "react-icons/fa";
import { getStudent, updateStudent } from "../../services/StudentService";
import { Student } from "../../models/Student";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = Number.parseInt(params.id || "");
  const student = await getStudent(id);
  console.log(student);
  return student;
}

interface FormValues {
  id: number;
  firstName: string;
  lastName: string;
  enrollmentDate?: string;
}

export default function EditStudent() {
  const student = useLoaderData() as Student;
  const initialValues: FormValues = {
    id: student.id,
    firstName: student.firstName,
    lastName: student.lastName,
    enrollmentDate: student.enrollmentDate?.toString(),
  };

  return (
    <>
      <Button
        variant="outline"
        leftIcon={<FaAngleLeft />}
        as={NavLink}
        to="/students"
      >
        Back
      </Button>
      <Heading as="h1" size="xl" mb={5}>
        Update Student
      </Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          const student: Student = {
            ...values,
            enrollmentDate: values.enrollmentDate
              ? new Date(values.enrollmentDate)
              : undefined,
            enrollments: [],
          };

          updateStudent(student).then(() => setSubmitting(false));
        }}
        validate={(values) => {
          const errors: FormikErrors<typeof values> = {};
          if (!values.id) {
            errors.id = "Required";
          }
          if (!values.firstName) {
            errors.firstName = "Required";
          }
          if (!values.lastName) {
            errors.lastName = "Required";
          }
          if (
            values.enrollmentDate &&
            isNaN(Date.parse(values.enrollmentDate))
          ) {
            errors.enrollmentDate = "Invalid Date";
          }

          return errors;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="id">
              {({
                field,
                form,
              }: {
                field: FieldInputProps<number>;
                form: FormikProps<FormValues>;
              }) => (
                <FormControl isInvalid={!!form.errors.id && form.touched.id}>
                  <FormLabel>ID</FormLabel>
                  <Input {...field} disabled={true} />
                  <FormErrorMessage>{form.errors.id}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="firstName">
              {({
                field,
                form,
              }: {
                field: FieldInputProps<string>;
                form: FormikProps<FormValues>;
              }) => (
                <FormControl
                  isInvalid={!!form.errors.firstName && form.touched.firstName}
                  mt={4}
                >
                  <FormLabel>First Name</FormLabel>
                  <Input {...field} placeholder="First name" />
                  <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="lastName">
              {({
                field,
                form,
              }: {
                field: FieldInputProps<string>;
                form: FormikProps<FormValues>;
              }) => (
                <FormControl
                  isInvalid={!!form.errors.lastName && form.touched.lastName}
                  mt={4}
                >
                  <FormLabel>Last Name</FormLabel>
                  <Input {...field} placeholder="Last name" />
                  <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="enrollmentDate">
              {({
                field,
                form,
              }: {
                field: FieldInputProps<string | undefined>;
                form: FormikProps<FormValues>;
              }) => (
                <FormControl
                  isInvalid={
                    !!form.errors.enrollmentDate && form.touched.enrollmentDate
                  }
                  mt={4}
                >
                  <FormLabel>Enrollment Date</FormLabel>
                  <SingleDatepicker
                    onDateChange={(d) =>
                      form.setFieldValue("enrollmentDate", d.toString())
                    }
                    date={new Date(field.value || "")}
                  />

                  <FormErrorMessage>
                    {form.errors.enrollmentDate}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Update Student Info
            </Button>
          </Form>
        )}
      </Formik>
      <Heading as="h2" size="lg" mt={5} mb={5}>
        Courses
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Course ID</Th>
              <Th>Name</Th>
              <Th>Credit Hours</Th>
              <Th>Current Grade</Th>
            </Tr>
          </Thead>
          <Tbody>
            {student.enrollments.map((e) => (
              <Tr key={e.id}>
                <Td>{e.course.id}</Td>
                <Td>{e.course.title}</Td>
                <Td>{e.course.credits}</Td>
                <Td>{e.grade}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
