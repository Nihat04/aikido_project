import { Attendance } from '@/entities/lesson';
import { CreatePayment } from '@/entities/user';
import { RedGradientButton } from '@/shared/ui';
import { FormInput } from '@/shared/ui/Inputs';
import { Stack } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';

type PayFormProps = {
    studentId: string;
    attendance: Attendance;
};

type FormProps = {
    sum: string;
    file: File[];
};

export const PayForm: React.FC<PayFormProps> = ({ studentId, attendance }) => {
    const { register, handleSubmit } = useForm<FormProps>();

    const onSubmit = (fields: FormProps) => {
        console.log(typeof fields.file);
        CreatePayment(studentId, attendance.date, fields.sum, fields.file[0]);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    spacing={2}
                    direction={'row'}
                    sx={{ alignItems: 'flex-end' }}
                >
                    <div>
                        <p>Сумма оплаты</p>
                        <FormInput
                            width="402px"
                            placeholder="500"
                            type="text"
                            {...register('sum', {
                                required:
                                    'Поле "Логин" обязательна к заполнению',
                            })}
                        />
                    </div>
                    <div>
                        <p>Фотография (скан) чека</p>
                        <FormInput
                            width="402px"
                            placeholder="ФИО"
                            type="file"
                            {...register('file', {
                                required:
                                    'Поле "Логин" обязательна к заполнению',
                            })}
                        />
                    </div>
                    <div>
                        <RedGradientButton type="submit">
                            Сохранить
                        </RedGradientButton>
                    </div>
                </Stack>
            </form>
        </div>
    );
};
