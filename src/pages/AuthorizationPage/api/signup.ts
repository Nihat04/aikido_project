import { FieldValues } from 'react-hook-form';
import apiClient from '../../../shared/api/apiClient';
export const registerUser = async (data: FieldValues) => {
    const response = await apiClient.post('/Coach/Register', {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
    });
    if (response.status !== 200) {
        throw new Error('Ошибка авторизации');
    }
    return true;
};
