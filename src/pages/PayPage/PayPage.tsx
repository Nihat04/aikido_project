import { RootState } from '@/features/store/store';
import { DatePanel } from '@/shared/ui/DatePanel/DatePanel';
import Header from '@/widgets/Header/Header';
import { Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { CreatePayment, getStudentPayment } from '@/entities/user';
import { FormInput } from '@/shared/ui/Inputs';
import { RedGradientButton } from '@/shared/ui';
import { Payment } from '@/entities/lesson/model/types/payment';

type FormProps = {
    sum: string;
    file: File[];
};

const infoStyle: React.CSSProperties = {
    padding: '10px 0',
    width: '190px',
    textAlign: 'center',
    backgroundColor: '#E2E2E2',
    border: '1px solid #000',
    borderRadius: '15px',
};

const PayPage: React.FC = () => {
    const { register, handleSubmit } = useForm<FormProps>();

    const [date, setDate] = useState<Date>(new Date());
    const [payment, setPayment] = useState<Payment>();
    const user = useSelector((state: RootState) => state.user);

    const onSubmit = (fields: FormProps) => {
        console.log(typeof fields.file);
        if (user.user) {
            CreatePayment(
                user.user.id,
                date.toISOString().split('T')[0],
                fields.sum,
                fields.file[0]
            ).then(() =>
                getStudentPayment(user.user.id, Number(date.getMonth())).then(
                    (res) => setPayment(res)
                )
            );
        }
    };

    useEffect(() => {
        if (user.user && user.user.role === 'student') {
            getStudentPayment(user.user.id, Number(date.getMonth())).then(
                (res) => setPayment(res)
            );
        }
    }, [user, date]);

    return (
        <>
            <Header />
            <main>
                <section>
                    <Box sx={{ marginBottom: '10px' }}>
                        <Stack
                            spacing={2}
                            direction={'row'}
                            sx={{ justifyContent: 'center' }}
                        >
                            <DatePanel
                                title="Выберите период оплаты"
                                date={date}
                                setDate={setDate}
                            />
                        </Stack>
                    </Box>
                    <Stack
                        spacing={2}
                        sx={{
                            padding: '20px 30px',
                            backgroundColor: '#fff',
                            borderRadius: '15px',
                        }}
                    >
                        {payment && (
                            <Stack
                                direction={'row'}
                                sx={{
                                    paddingBottom: '50px',
                                    justifyContent: 'space-around',
                                }}
                            >
                                <Box>
                                    <p>Количество посещений</p>
                                    <p style={infoStyle}>{payment.num}</p>
                                </Box>
                                <Box>
                                    <p>Цена за занятие</p>
                                    <p style={infoStyle}>{payment.price}</p>
                                </Box>
                                <Box>
                                    <p>Сумма к оплате</p>
                                    <p style={infoStyle}>{payment.sum}</p>
                                </Box>
                            </Stack>
                        )}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack
                                spacing={2}
                                direction={'column'}
                                sx={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
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
                        {/* {visibleAttendances.map((attendance, index) => (
                            <DropDownMenu key={index} title={attendance.date}>
                                <Box
                                    sx={{
                                        padding: '20px 30px',
                                        backgroundColor: '#fff',
                                        borderRadius: '15px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            paddingBottom: '5px',
                                            borderBottom: '3px solid #000',
                                        }}
                                    >
                                        <p>
                                            Посещение:{' '}
                                            {attendance.isPresent
                                                ? 'присутствовал'
                                                : 'отсутствовал'}
                                        </p>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            padding: '20px 30px',
                                            justifyContent: 'space-between',
                                            backgroundColor: '#fff',
                                            borderRadius: '15px',
                                        }}
                                    >
                                        {user.user && (
                                            <PayForm
                                                studentId={user.user?.id}
                                                attendance={attendance}
                                            />
                                        )}
                                    </Box>
                                </Box>
                            </DropDownMenu>
                        ))} */}
                    </Stack>
                </section>
            </main>
        </>
    );
};

export default PayPage;
