import React, { useEffect, useMemo, useState } from 'react';

import Header from '@/widgets/Header/Header';
import { DatePanel } from '@/shared/ui/DatePanel/DatePanel';
import { Box, MenuItem, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/store/store';
import { getGroups, Group } from '@/entities/group';
import { useNavigate } from 'react-router-dom';
import { getLessons, Lesson } from '@/entities/lesson';
import { FormInput } from '@/shared/ui/Inputs';
import { CreatePayment as createPayment } from '@/entities/user';
import { DropDownMenu } from '@/shared/ui/DropDownMenu';
import { StudentsList } from './ui/StudentsList';

const StudentsPayments: React.FC = () => {
    const [date, setDate] = useState<Date>(new Date());
    const user = useSelector((state: RootState) => state.user);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const navigate = useNavigate();
    const [groups, setGroups] = useState<Group[]>([]);
    const [currentGroup, setCurrentGroup] = useState<Group | undefined>(
        groups[0]
    );

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
    }, [currentGroup]);
    const groupPrice = useMemo<number>(() => {
        return currentLessons[0] ? currentLessons[0].price : 0;
    }, [currentLessons]);

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
    }, [user]);

    const setPayment = (studentId: string, date: string, price: number) => {
        createPayment(studentId, date, String(price)).then(() =>
            location.reload()
        );
    };

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
                    <div>
                        <Stack spacing={2}>
                            {currentGroup &&
                                currentLessons.map((lesson, index) => (
                                    <DropDownMenu
                                        title={lesson.groupName}
                                        time={lesson.date}
                                    >
                                        <Box
                                            sx={{
                                                padding: '20px',
                                                backgroundColor: '#fff',
                                                borderRadius: '15px',
                                            }}
                                        >
                                            <StudentsList
                                                list={currentGroup.sportsmens}
                                                key={index}
                                                clickAction={setPayment}
                                                lesson={lesson}
                                            />
                                        </Box>
                                    </DropDownMenu>
                                ))}
                        </Stack>
                    </div>
                </section>
            </main>
        </>
    );
};

export default StudentsPayments;
