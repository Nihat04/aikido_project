import styles from '@/pages/AttendancePage/AttendancePage.module.css';

import { Group } from '@/entities/group';
import { Lesson, setAttendance2 } from '@/entities/lesson';
import React, { useState } from 'react';
import { DropDownMenu } from '../DropDownMenu';
import { Loader } from '../Loader/Loader';
import { StudentsListInput2 } from '../StudentsList/StudentsListInput2';

type LessonGroupProps = {
    groups: Group[];
    lesson: Lesson;
};

export const LessonGroup: React.FC<LessonGroupProps> = ({ groups, lesson }) => {
    const onSubmit = (studentId: string, state: boolean) => {
        setAttendance2({
            sportsmenId: studentId,
            date: lesson.date,
            isPresent: state,
        }).then(() => location.reload);
    };

    const [group] = useState<Group | undefined>(
        groups.find((group) => group.name === lesson.groupName)
    );

    const fixedTime =
        lesson.time.split(':')[0] + ':' + lesson.time.split(':')[1];

    if (!group) {
        return;
    }

    return (
        <>
            {lesson ? (
                <DropDownMenu
                    title={lesson.groupName}
                    time={`${lesson.date} ${fixedTime}`}
                >
                    <div className={styles['group']}>
                        <StudentsListInput2
                            list={group?.sportsmens}
                            func={onSubmit}
                            date={lesson.date}
                        />
                    </div>
                </DropDownMenu>
            ) : (
                <Loader />
            )}{' '}
        </>
    );
};
