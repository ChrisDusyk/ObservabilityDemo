import { Enrollment } from "./Enrollment";

export interface Student {
    id: number;
    lastName: string;
    firstName: string;
    enrollmentDate?: Date;
    enrollments: Enrollment[];
}