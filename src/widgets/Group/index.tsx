import styles from './index.module.css';

import { Modal } from '@mui/material';

import { DropDownMenu } from '../../shared/ui/DropDownMenu';
import { RedGradientButton } from '../../shared/ui';
import { GreyButton } from '../../shared/ui/GreyButton';
import { useEffect, useMemo, useState } from 'react';
import { addStudent, deleteGroup, Group as GroupType } from '@/entities/group';
import { getStudents, Student } from '@/entities/user';
import classNames from 'classnames';
import { FormInput } from '@/shared/ui/Inputs';
import { StudentsList, StudentsListInput } from '@/shared/ui/StudentsList';
import { FieldValues, useForm } from 'react-hook-form';

type GroupProps = { group: GroupType };

const Group: React.FC<GroupProps> = ({ group }) => {
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm();

    const [students, setStudents] = useState<Student[]>([]);
    const [search, setSearch] = useState<string>('');
    const [deleteModal, setDeleteModal] = useState<{
        state: boolean;
        groupId?: string;
    }>({ state: false });
    const freeStudents = useMemo<Student[]>(() => {
        let filteredStudents = students.filter(
            (student) =>
                !group.sportsmens
                    .map((groupStudent) => groupStudent.id)
                    .includes(student.id)
        );

        if (search) {
            filteredStudents = filteredStudents.filter((student) =>
                student.fullName.includes(search)
            );
        }

        return filteredStudents;
    }, [students, search]);

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
                        <RedGradientButton
                            onClick={() =>
                                setDeleteModal({
                                    state: true,
                                    groupId: group.id,
                                })
                            }
                        >
                            Удалить Группу
                        </RedGradientButton>
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
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <StudentsListInput
                            width="100%"
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
            <Modal
                onClose={() => setDeleteModal({ ...deleteModal, state: false })}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                open={deleteModal.state}
            >
                <div
                    className={classNames(
                        styles['modal-content'],
                        styles['modal-sm']
                    )}
                >
                    <p className={styles['modal-title']}>Удалить группу?</p>
                    <div className={styles['form-btns']}>
                        <RedGradientButton
                            onClick={() =>
                                setDeleteModal({
                                    ...deleteModal,
                                    state: false,
                                })
                            }
                        >
                            Нет
                        </RedGradientButton>
                        <RedGradientButton
                            onClick={() => {
                                if (deleteModal.groupId) {
                                    deleteGroup(deleteModal.groupId).then(() =>
                                        location.reload()
                                    );
                                }
                            }}
                        >
                            Да
                        </RedGradientButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Group;
