import styles from './AttendancePage.module.css';

import React, { useEffect, useState } from 'react';

import { getLessons, Lesson } from '@/entities/lesson';

import Header from '@/widgets/Header/Header';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/store/store';
import { getGroups, Group } from '@/entities/group';
import { LessonGroup } from '@/shared/ui/LessonGroup/LessonGroup';
import { Box, MenuItem, Stack, useMediaQuery } from '@mui/material';
import { Loader } from '@/shared/ui/Loader/Loader';
import { DatePanel } from '@/shared/ui/DatePanel/DatePanel';
import { FormInput } from '@/shared/ui/Inputs';
import json2mq from 'json2mq';

export type FormProps = {
    studentsIds: string[];
};

const AttendancePage: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);

    const [date, setDate] = useState<Date>(new Date());
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [render, setRender] = useState(false);
    const [currentGroup, setCurrentGroup] = useState<Group | undefined>(
        undefined
    );

    const matches = useMediaQuery(
        json2mq({
            maxWidth: 940,
        })
    );

    const filter = (lessons: Lesson[]) => {
        return lessons.filter((lesson) => {
            const lessonDate = new Date(lesson.date);
            if (lessonDate.getMonth() == date.getMonth()) {
                if (currentGroup) {
                    if (lesson.groupName === currentGroup.name) {
                        return lesson;
                    }
                } else {
                    return lesson;
                }
            }
        });
    };

    useEffect(() => {
        if (user.logedIn && user.user?.id) {
            setLessons([]);
            getLessons(user.user.id).then((res) => {
                setLessons(filter(res));
            });
            getGroups(user.user.id).then((res) => setGroups(res));
        }
    }, [user, date, currentGroup]);

    useEffect(() => {
        if (lessons.length > 0) {
            setRender(true);
        }
    }, [lessons]);

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
                                title="Выберите период"
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
                        </Stack>
                    </Box>
                    <div className={styles['list']}>
                        {render ? (
                            lessons.map((lesson, index) => (
                                <LessonGroup
                                    groups={groups}
                                    lesson={lesson}
                                    key={index}
                                />
                            ))
                        ) : (
                            <Loader />
                        )}
                    </div>
                </section>
            </main>
            ;
        </>
    );
};

export default AttendancePage;
