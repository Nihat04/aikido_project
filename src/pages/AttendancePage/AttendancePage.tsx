import styles from './AttendancePage.module.css';

import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { getLessons, Lesson, setAttendance } from '@/entities/lesson';

import Header from '@/widgets/Header/Header';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/store/store';
import { getGroups, Group } from '@/entities/group';
import { LessonGroup } from '@/shared/ui/LessonGroup/LessonGroup';
import { DatePanel } from '@/shared/ui/DatePanel/DatePanel';
import { Box, Stack } from '@mui/material';

export type FormProps = {
    studentsIds: string[];
};

const AttendancePage: React.FC = () => {
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm<FormProps>();

    const user = useSelector((state: RootState) => state.user);

    const [date, setDate] = useState<Date>(new Date());
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [submitData, setSubmitData] = useState<{ date: string }>({
        date: '',
    });

    const currentLessons = useMemo<Lesson[]>(() => {
        return lessons.filter((lesson) => {
            const lessonDate = new Date(lesson.date);

            if (lessonDate.getMonth() === date.getMonth()) {
                return lesson;
            }
        });
    }, [lessons, date]);

    const onSubmit = (fields: FormProps) => {
        setAttendance(
            fields.studentsIds.map((st) => ({
                sportsmenId: st,
                date: submitData.date,
                isPresent: true,
            }))
        ).then(() => location.reload);
    };

    useEffect(() => {
        if (user.logedIn && user.user?.id) {
            getLessons(user.user.id).then((res) => setLessons(res));
            getGroups(user.user.id).then((res) => setGroups(res));
        }
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
                                title="Выберите период"
                                date={date}
                                setDate={setDate}
                            />
                        </Stack>
                    </Box>
                    <div className={styles['list']}>
                        {currentLessons.map((lesson, index) => (
                            <LessonGroup
                                groups={groups}
                                lesson={lesson}
                                onSubmit={onSubmit}
                                handleSubmit={handleSubmit}
                                register={register}
                                setSubmitData={setSubmitData}
                                key={index}
                            />
                        ))}
                    </div>
                </section>
            </main>
            ;
        </>
    );
};

export default AttendancePage;
