import styles from './index.module.css';

import { IconButton } from '@mui/material';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import { FieldValues, useForm } from 'react-hook-form';

import { RedGradientButton } from '../../shared/ui';

import Header from '../../widgets/Header/Header';
import { useEffect, useMemo, useState } from 'react';
import {
    createNewStudent,
    deleteStudent,
    getStudents,
    Student,
} from '@/entities/user';
import { FormInput } from '@/shared/ui/Inputs';
import classNames from 'classnames';
import { DeleteBtn } from '@/shared/ui/DeleteBtn';
import EditIcon from '@/shared/assets/icons/EditIcon';
import { Loader } from '@/shared/ui/Loader/Loader';

function searchStudents(studentsList: Student[], searchString: string) {
    if (searchString) {
        return studentsList.filter((student) =>
            student.fullName.includes(searchString)
        );
    } else {
        return studentsList;
    }
}

const StudentsPage = () => {
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm();
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<{
        state: boolean;
        studentId: string | null;
    }>({ state: false, studentId: null });
    const [searchString, setSearchString] = useState<string>('');
    const [studentsList, setStudentsList] = useState<Student[]>([]);
    const [loader, setLoader] = useState<boolean>(true);

    const visibleStudents = useMemo<Student[]>(
        () => searchStudents(studentsList, searchString),
        [studentsList, searchString]
    );

    const onSubmit = async (data: FieldValues) => {
        createNewStudent(data.name).then((res) => {
            setCreateModalOpen(false);
            alert(
                `Ученик ${data.name} создан\nимя пользователя: ${res.login}\nпароль: ${res.password}`
            );
        });
    };

    useEffect(() => {
        getStudents()
            .then((res) => setStudentsList(res))
            .then(() => setLoader(false));
    }, []);

    return (
        <>
            <Header />
            <main>
                <section
                    className={classNames(
                        styles['centered'],
                        styles['limit-section']
                    )}
                >
                    <div className={styles['finder']}>
                        <div
                            className={classNames(
                                styles['island'],
                                styles['input-wrapper']
                            )}
                        >
                            <FormInput
                                width="100%"
                                placeholder="Найти ученика"
                                type="search"
                                onChange={(e) =>
                                    setSearchString(e.target.value)
                                }
                            />
                        </div>
                        <div className={styles['island']}>
                            <ul className={styles['list']}>
                                {visibleStudents.map((student) => (
                                    <li
                                        className={styles['list-item']}
                                        key={student.id}
                                    >
                                        <DeleteBtn
                                            onClick={() =>
                                                setDeleteModal({
                                                    state: true,
                                                    studentId: student.id,
                                                })
                                            }
                                        />
                                        <p>{student.fullName}</p>
                                        <div style={{ marginLeft: 'auto' }}>
                                            <IconButton
                                                sx={{
                                                    width: '24px',
                                                    height: '24px',
                                                }}
                                            >
                                                <EditIcon
                                                    style={{
                                                        margin: '0 auto',
                                                        width: '24px',
                                                        height: '24px',
                                                    }}
                                                />
                                            </IconButton>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div
                        className={styles['centered']}
                        style={{ width: 'max-content' }}
                    >
                        <RedGradientButton
                            onClick={() => setCreateModalOpen(true)}
                        >
                            Создать ученика
                        </RedGradientButton>
                    </div>
                </section>
                <Modal open={createModalOpen} className={styles['modal']}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={styles['form']}
                    >
                        <input
                            type="text"
                            placeholder="ФИО"
                            {...register('name', {
                                required:
                                    'Поле "Логин" обязательна к заполнению',
                            })}
                        />
                        <RedGradientButton
                            onClick={() => setCreateModalOpen(false)}
                        >
                            Отмена
                        </RedGradientButton>
                        <RedGradientButton type="submit">
                            Создать
                        </RedGradientButton>
                    </form>
                </Modal>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    onClose={() =>
                        setDeleteModal({ ...deleteModal, state: false })
                    }
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    open={deleteModal.state}
                >
                    <>
                        <ModalClose />
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={styles['form']}
                        >
                            <input
                                type="text"
                                placeholder="ФИО"
                                {...register('name', {
                                    required:
                                        'Поле "Логин" обязательна к заполнению',
                                })}
                            />
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
                                    if (deleteModal.studentId) {
                                        setLoader(true);
                                        deleteStudent(deleteModal.studentId)
                                            .then(() =>
                                                setStudentsList(
                                                    studentsList.filter(
                                                        (st) =>
                                                            st.id !==
                                                            deleteModal.studentId
                                                    )
                                                )
                                            )
                                            .then(() => setLoader(false));
                                    }
                                }}
                            >
                                Да
                            </RedGradientButton>
                        </form>
                    </>
                </Modal>
            </main>
            {loader && <Loader />}
        </>
    );
};

export default StudentsPage;
