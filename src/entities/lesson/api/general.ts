import apiClient from '@/shared/api/apiClient';
import { Lesson } from '../model';

export async function getLessons(coachId: string): Promise<Lesson[]> {
    const response = await apiClient(
        `/api/Lesson/GetCoachLessons?coachId=${coachId}`
    );
    const data = await response.data;

    return data;
}

export async function createLesson(lessonData: {
    coachId: string;
    groupId: string;
    price: number;
    date: string;
    time: string;
}) {
    const response = await apiClient.post(
        `/api/Lesson/CreateLesson`,
        lessonData
    );
    const data = await response.data;

    return data;
}
