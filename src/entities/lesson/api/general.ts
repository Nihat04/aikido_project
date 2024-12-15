import apiClient from '@/shared/api/apiClient';

export async function getLessons(coachId: string) {
    const response = await apiClient(
        `/api/Lesson/GetCoachLessons?coachId=${coachId}`
    );
    const data = await response.data;

    return data;
}
