import { FieldValues } from 'react-hook-form';
import apiClient from '../../../shared/api/apiClient';

export const loginCoach = async (data: FieldValues) => {
    const response = await apiClient.post('/Coach/LoginCoach', {
        email: data.login,
        password: data.password,
    });
    if (response.status !== 200) {
        throw new Error('Ошибка Авторизации');
    }
    return response.data;
};

export const loginStudent = async (data: FieldValues) => {
    const response = await apiClient.post('/Sportsmen/LoginSportsmen', {
        userName: data.login,
        password: data.password,
    });
    if (response.status !== 200) {
        throw new Error('Ошибка Авторизации');
    }
    return response.data;
};
