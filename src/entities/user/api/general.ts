import apiClient from '@/shared/api/apiClient';
import { Student } from '../model/types/student';

export async function getStudents(): Promise<Student[]> {
    const res = await apiClient.get('/Sportsmen/GetSportsmens');
    const data = await res.data;

    return data;
}

export async function getStudentLoginData(
    name: string
): Promise<{ login: string; password: string }> {
    return await (
        await apiClient.post('/Sportsmen/MakeDataEntry', name)
    ).data;
}

export async function createNewStudent(name: string) {
    const logData = await getStudentLoginData(name);

    await apiClient.post('/Sportsmen/RegisterSportsmen', {
        fullName: name,
        userName: logData.login,
        Password: logData.password,
    });

    return logData;
}

export async function deleteStudent(id: string): Promise<number> {
    const res = await apiClient.delete(`/Sportsmen/DeleteSportsmen?id=${id}`);
    const status = await res.status;

    return status;
}
