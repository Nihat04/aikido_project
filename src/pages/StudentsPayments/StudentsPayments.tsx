import React, { useEffect, useMemo, useState } from 'react';

import Header from '@/widgets/Header/Header';
import { DatePanel } from '@/shared/ui/DatePanel/DatePanel';
import { Box, MenuItem, Stack, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/store/store';
import { getGroups, Group } from '@/entities/group';
import { useNavigate } from 'react-router-dom';
import { getLessons, Lesson } from '@/entities/lesson';
import { FormInput } from '@/shared/ui/Inputs';
import { getStudentPayment, Student } from '@/entities/user';
import json2mq from 'json2mq';
import { Payment } from '@/entities/lesson/model/types/payment';
import { StudentsList2 } from './ui/StudentsList2';

type payData = Student & {
    payInfo: Payment;
};

const StudentsPayments: React.FC = () => {
    const matches = useMediaQuery(
        json2mq({
            maxWidth: 940,
        })
    );

    const [date, setDate] = useState<Date>(new Date());
    const user = useSelector((state: RootState) => state.user);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const navigate = useNavigate();
    const [groups, setGroups] = useState<Group[]>([]);
    const [currentGroup, setCurrentGroup] = useState<Group | undefined>(
        groups[0]
    );
    const [studentsData, setStudentsData] = useState<payData[]>([]);

    const currentLessons = useMemo<Lesson[]>(() => {
        let filteredLessons = lessons.filter(
            (lesson) => lesson.groupName === currentGroup?.name
        );

        filteredLessons = filteredLessons.filter((lesson) => {
            const lessonDate = new Date(lesson.date);

            if (lessonDate.getMonth() === date.getMonth()) {
                return lesson;
            }
        });

        return filteredLessons;
    }, [currentGroup, date]);

    const [updater, setUpdater] = useState(false);

    const groupPrice = useMemo<number>(() => {
        return currentLessons[0] ? currentLessons[0].price : 0;
    }, [currentLessons, date]);

    useEffect(() => {
        if (user.logedIn) {
            if (user.user?.role !== 'coach') {
                navigate('/');
            }
        }

        if (user.user?.id) {
            getLessons(user.user?.id).then((res) => setLessons(res));
        }

        if (user.user) {
            getGroups(user.user.id).then((res) => setGroups(res));
        }

        const fetchStudentsData = async () => {
            if (currentGroup) {
                const studentsWithPayInfo = await Promise.all(
                    currentGroup.sportsmens.map(async (student) => {
                        const payInfo = await getStudentPayment(
                            student.id,
                            date.getMonth()
                        );
                        return {
                            ...student,
                            payInfo,
                        };
                    })
                );
                setStudentsData(studentsWithPayInfo);
            }
        };

        fetchStudentsData();
    }, [user, currentGroup, date, updater]);

    return (
        <>
            <Header />
            <main>
                <section>
                    <Box sx={{ marginBottom: '10px' }}>
                        <Stack
                            spacing={2}
                            direction={matches ? 'column' : 'row'}
                            sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <DatePanel
                                title="Выберите период оплаты"
                                date={date}
                                setDate={setDate}
                            />
                            <Box
                                sx={{
                                    padding: '20px',
                                    width: 'max-content',
                                    backgroundColor: '#fff',
                                    borderRadius: '15px',
                                }}
                            >
                                <p style={{ marginBottom: '5px' }}>Группа</p>
                                <FormInput
                                    width="200px"
                                    value={currentGroup?.id || ''}
                                    onChange={(e) => {
                                        const selectedGroup = groups.find(
                                            (group) =>
                                                group.id === e.target.value
                                        );
                                        setCurrentGroup(selectedGroup);
                                    }}
                                    select
                                >
                                    {groups.map((group, index) => (
                                        <MenuItem value={group.id} key={index}>
                                            {group.name}
                                        </MenuItem>
                                    ))}
                                </FormInput>
                            </Box>
                            <Box
                                sx={{
                                    padding: '20px',
                                    width: 'max-content',
                                    backgroundColor: '#fff',
                                    borderRadius: '15px',
                                }}
                            >
                                <p style={{ marginBottom: '5px' }}>
                                    Стоимость занятия
                                </p>
                                <Box
                                    sx={{
                                        padding: '10px 0',
                                        width: '153px',
                                        textAlign: 'center',
                                        backgroundColor: '#E2E2E2',
                                        border: '2px solid #000',
                                        borderRadius: '15px',
                                    }}
                                >
                                    {groupPrice}
                                </Box>
                            </Box>
                        </Stack>
                    </Box>
                </section>
                <section>
                    <div>
                        <Stack spacing={2}>
                            {currentGroup && (
                                <StudentsList2
                                    students={studentsData}
                                    date={date}
                                    updater={updater}
                                    setUpdater={setUpdater}
                                />
                            )}
                        </Stack>
                    </div>
                </section>
            </main>
        </>
    );
};

export default StudentsPayments;
