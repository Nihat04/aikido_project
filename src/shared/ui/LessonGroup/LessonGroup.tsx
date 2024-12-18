import styles from '@/pages/AttendancePage/AttendancePage.module.css';

import { Group } from '@/entities/group';
import { getAttendances, Lesson } from '@/entities/lesson';
import React, { useEffect, useState } from 'react';
import { DropDownMenu } from '../DropDownMenu';
import { RedGradientButton } from '../RedGradientButton';
import { StudentsListInput } from '../StudentsList';
import { FormProps } from '@/pages/AttendancePage/AttendancePage';
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { Loader } from '../Loader/Loader';

type LessonGroupProps = {
    groups: Group[];
    lesson: Lesson;
    handleSubmit: UseFormHandleSubmit<FormProps, undefined>;
    onSubmit: (fields: FormProps) => void;
    register: UseFormRegister<FormProps>;
    setSubmitData: React.Dispatch<
        React.SetStateAction<{
            date: string;
        }>
    >;
};

export const LessonGroup: React.FC<LessonGroupProps> = ({
    groups,
    lesson,
    handleSubmit,
    onSubmit,
    register,
    setSubmitData,
}) => {
    const [group] = useState<Group | undefined>(
        groups.find((group) => group.name === lesson.groupName)
    );
    const [render, setRender] = useState<boolean>(false);

    const [studentsAttendances, setStudentsAttendances] = useState<string[]>(
        []
    );

    const fixedTime =
        lesson.time.split(':')[0] + ':' + lesson.time.split(':')[1];

    useEffect(() => {
        if (group) {
            const fetchAttendances = async () => {
                const attArr: string[] = [];

                await Promise.all(
                    group.sportsmens.map(async (student) => {
                        const res = await getAttendances(student.id);
                        for (const attendance of res) {
                            if (
                                attendance.date === lesson.date &&
                                attendance.isPresent
                            ) {
                                attArr.push(student.id);
                            }
                        }
                    })
                );

                setStudentsAttendances(attArr);
                setRender(true);
            };

            fetchAttendances();
        }
    }, [group, lesson.date]);

    if (!group) {
        return;
    }

    return (
        <>
            {render ? (
                <DropDownMenu
                    title={lesson.groupName}
                    time={`${lesson.date} ${fixedTime}`}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles['group']}>
                            <StudentsListInput
                                checkBoxProps={{
                                    ...register('studentsIds'),
                                }}
                                list={group?.sportsmens}
                                checkedBoxes={studentsAttendances}
                            />
                        </div>
                        <RedGradientButton
                            sx={{
                                margin: 'auto',
                                width: 'max-content',
                            }}
                            type="submit"
                            onClick={() =>
                                setSubmitData({
                                    date: lesson.date,
                                })
                            }
                        >
                            Отметить посещение
                        </RedGradientButton>
                    </form>
                </DropDownMenu>
            ) : (
                <Loader />
            )}{' '}
        </>
    );
};
