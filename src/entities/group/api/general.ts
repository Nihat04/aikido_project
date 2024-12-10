import apiClient from '@/shared/api/apiClient';
import { Group } from '../model';

export async function getGroups(userId: string): Promise<Group[]> {
    const res = await apiClient.get(
        `api/Group/GetCoachesGroupes?coachId=${userId}`
    );

    const data = res.data;

    return data;
}

export async function addStudent(groupId: string, studentsIds: string[]) {
    const res = await apiClient.post('/api/Group/AddSportmenToGroup', {
        groupId: groupId,
        sportsmen: studentsIds,
    });

    const data = res.data;

    return data;
}
