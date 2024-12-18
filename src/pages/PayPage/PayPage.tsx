import { Attendance, getAttendances } from '@/entities/lesson';
import { RootState } from '@/features/store/store';
import { DatePanel } from '@/shared/ui/DatePanel/DatePanel';
import { DropDownMenu } from '@/shared/ui/DropDownMenu';
import Header from '@/widgets/Header/Header';
import { Box, Stack } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { PayForm } from './ui/PayForm';

const PayPage: React.FC = () => {
    const [attendances, setAttendances] = useState<Attendance[]>([]);
    const [date, setDate] = useState<Date>(new Date());
    const user = useSelector((state: RootState) => state.user);

    const visibleAttendances = useMemo(() => {
        return attendances.filter((attendance) => {
            const attendanceDate = new Date(attendance.date);

            if (attendanceDate.getMonth() === date.getMonth()) {
                return attendance;
            }
        });
    }, [attendances]);

    useEffect(() => {
        if (user.user && user.user.role === 'student')
            getAttendances(user.user?.id).then((res) => setAttendances(res));
    }, [user]);

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
                    <Stack spacing={2}>
                        {visibleAttendances.map((attendance, index) => (
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
                        ))}
                    </Stack>
                </section>
            </main>
        </>
    );
};

export default PayPage;
