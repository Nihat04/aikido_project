import { Payment } from '@/entities/lesson/model/types/payment';
import apiClient from '@/shared/api/apiClient';

export async function CreatePayment(
    studentId: string,
    date: string,
    price: string,
    file?: File
) {
    const formData = new FormData();

    // Append the form-data fields
    formData.append('Date', date);
    formData.append('Summary', price);
    formData.append('Sportsmen', studentId);

    if (file) {
        formData.append('ImageFile', file);
    }

    const res = await apiClient.post('api/Pay/AddPay', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    const data = await res.data;

    return data;
}

export async function getStudentPayment(
    sportsmenId: string,
    month: number
): Promise<Payment> {
    const response = await apiClient.post(`/api/Pay/GetPaysSportsmen`, {
        sportsmenId,
        month,
    });
    const data = await response.data;

    return data;
}
