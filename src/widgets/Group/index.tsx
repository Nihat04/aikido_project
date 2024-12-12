import styles from './index.module.css';

import { Modal } from '@mui/material';

import { DropDownMenu } from '../../shared/ui/DropDownMenu';
import { RedGradientButton } from '../../shared/ui';
import { GreyButton } from '../../shared/ui/GreyButton';
import { useEffect, useMemo, useState } from 'react';
import { addStudent, Group as GroupType } from '@/entities/group';
import { getStudents, Student } from '@/entities/user';
import classNames from 'classnames';
import { FormInput } from '@/shared/ui/Inputs';
import { StudentsList, StudentsListInput } from '@/shared/ui/StudentsList';
import { FieldValues, useForm } from 'react-hook-form';

const Group = ({ group }: { group: GroupType }) => {
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm();

    const [students, setStudents] = useState<Student[]>([]);
    const freeStudents = useMemo<Student[]>(
        () =>
            students.filter(
                (student) =>
                    !group.sportsmens
                        .map((groupStudent) => groupStudent.id)
                        .includes(student.id)
            ),
        [students]
    );

    const [addStudentModalOpen, setAddStudentModalOpen] =
        useState<boolean>(false);

    useEffect(() => {
        getStudents().then((res) => setStudents(res));
    }, []);

    const onSubmit = (submit: FieldValues) => {
        let addingStudents = submit.studentsIds;
        if (typeof addingStudents === 'string') {
            addingStudents = [addingStudents];
        }

        addStudent(group.id, submit.studentsIds).then(() => {
            location.reload();
        });
    };

    return (
        <div>
            <DropDownMenu title={group.name} className={styles['drop-menu']}>
                <div className={styles['group']}>
                    <div className={styles['btns']}>
                        <GreyButton
                            onClick={() => setAddStudentModalOpen(true)}
                        >
                            Добавить ученика
                        </GreyButton>
                        <RedGradientButton>Удалить Группу</RedGradientButton>
                    </div>
                    <StudentsList list={group.sportsmens} />
                </div>
            </DropDownMenu>
            <Modal
                onClose={() => setAddStudentModalOpen(false)}
                open={addStudentModalOpen}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div
                    className={classNames(
                        styles['modal-content'],
                        styles['modal-big']
                    )}
                >
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={styles['form']}
                    >
                        <FormInput
                            width="402px"
                            placeholder="Поиск"
                            type="search"
                        />
                        <StudentsListInput
                            list={freeStudents}
                            checkBoxProps={{ ...register('studentsIds') }}
                        />
                        <div className={styles['form-btns']}>
                            <RedGradientButton
                                onClick={() => setAddStudentModalOpen(false)}
                            >
                                Отмена
                            </RedGradientButton>
                            <RedGradientButton type="submit">
                                Создать
                            </RedGradientButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default Group;
