import { Course } from "./Course";

export interface Enrollment {
    id: number;
    grade?: number;
    course: Course;
}