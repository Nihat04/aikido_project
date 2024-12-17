import styles from './AttendancePage.module.css';

import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { StudentsListInput } from '@/shared/ui/StudentsList';
import { Student } from '@/entities/user';

import Header from '@/widgets/Header/Header';
import { DropDownMenu } from '@/shared/ui/DropDownMenu';
import { RedGradientButton } from '@/shared/ui';

const testStudents: Student[] = [{ id: '0', fullName: 'Петя' }];

const AttendancePage: React.FC = () => {
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm();

    const onSubmit = (fields: FieldValues) => {
        console.log(fields.studentsIds);
    };

    return (
        <>
            <Header />
            <main>
                <section>
                    <div>
                        <DropDownMenu title="АТ-01" time="10:00">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={styles['group']}>
                                    <StudentsListInput
                                        checkBoxProps={{
                                            ...register('studentsIds'),
                                        }}
                                        list={testStudents}
                                    />
                                </div>
                                <RedGradientButton
                                    sx={{
                                        margin: '0 auto',
                                        width: 'max-content',
                                    }}
                                    type="submit"
                                >
                                    Отметить посещение
                                </RedGradientButton>
                            </form>
                        </DropDownMenu>
                    </div>
                </section>
            </main>
            ;
        </>
    );
};

export default AttendancePage;
