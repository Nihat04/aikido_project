import apiClient from '../../../shared/apiClient';
import { user } from './types';

export async function getCoach(): Promise<user> {
    const coachId = localStorage.getItem('coachID');

    if (!coachId) throw new Error('unauthorized');

    const res = await apiClient.get('/Coach/GetCoaches');
    const data = await res.data;

    const coach = data.find((el: user) => el.id === coachId);

    if (!coach) throw new Error('unauthorized');

    return coach;
}
