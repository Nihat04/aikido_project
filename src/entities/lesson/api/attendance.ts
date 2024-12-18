import apiClient from '@/shared/api/apiClient';
import { Attendance } from '../model';

type setProps = {
    sportsmenId: string;
    date: string;
    isPresent: boolean;
};

export async function setAttendance(students: setProps[]) {
    const response = await apiClient.post(
        `/Sportsmen/ChangeAttendance`,
        students
    );
    const data = await response.data;

    return data;
}

export async function getAttendances(studentId: string): Promise<Attendance[]> {
    const response = await apiClient.get(
        `/Sportsmen/GetAttendance?sportsmanId=${studentId}`
    );
    const data = await response.data;
    return data;
}

export async function getAttendancesDates(
    studentId: string
): Promise<string[]> {
    const data = await getAttendances(studentId);

    return data.map((dat) => dat.date);
}
