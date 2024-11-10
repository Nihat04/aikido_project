import { FieldValues } from 'react-hook-form';
import apiClient from '../../../shared/apiClient';

export const loginUser = async (data: FieldValues) => {
    const response = await apiClient.post('/Coach/Login', {
        email: data.email,
        password: data.password,
    });
    if (response.status !== 200) {
        throw new Error('Ошибка Авторизации');
    }
    return response.data;
};
