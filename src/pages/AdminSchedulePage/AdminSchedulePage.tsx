import styles from './AdminSchedulePage.module.css';

import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { MenuItem, Stack } from '@mui/material';

import { createLesson, getLessons, Lesson } from '@/entities/lesson';
import { RootState } from '@/features/store/store';

import Header from '@/widgets/Header/Header';
import { RedGradientButton } from '@/shared/ui';
import { FormInput } from '@/shared/ui/Inputs';
import { ScheduleTable } from '@/widgets/Schedule/ui';
import classNames from 'classnames';
import { getGroups, Group } from '@/entities/group';

type LessonProps = {
    coachId: string;
    groupId: string;
    price: number;
    date: string;
    time: string;
};

const AdminSchedulePage: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<LessonProps>();

    const user = useSelector((state: RootState) => state.user);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const [groups, setGroups] = useState<Group[]>([]);

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

    const onSubmit = (fields: LessonProps) => {
        if (user.user?.id) {
            createLesson({
                ...fields,
                coachId: user.user?.id,
                time: fields.time + ':00',
                price: Number(fields.price),
            }).then(() => {
                if (user.user?.id) {
                    getLessons(user.user?.id).then((res) => setLessons(res));
                }
                setCreateModalOpen(false);
            });
        }
    };

    return (
        <>
            <Header />
            <main>
                <section>
                    <ScheduleTable lessons={lessons} />
                    <Stack sx={{ marginTop: '30px', alignItems: 'center' }}>
                        <RedGradientButton
                            sx={{ width: '302px' }}
                            onClick={() => setCreateModalOpen(true)}
                        >
                            Добавить тренировку
                        </RedGradientButton>
                    </Stack>
                </section>
            </main>
            <Modal
                onClose={() => setCreateModalOpen(false)}
                open={createModalOpen}
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
                    <h3 style={{ textAlign: 'center' }}>Новая Тренировка</h3>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={styles['form']}
                    >
                        <div>
                            <p>Группа</p>
                            <FormInput
                                width="402px"
                                placeholder="Стоимость занятия"
                                type="number"
                                value={watch('groupId') || ''}
                                onChange={(e) =>
                                    setValue('groupId', e.target.value)
                                }
                                select
                                error={!!errors.groupId}
                            >
                                {groups.map((group, index) => (
                                    <MenuItem value={group.id} key={index}>
                                        {group.name}
                                    </MenuItem>
                                ))}
                            </FormInput>
                        </div>
                        <div>
                            <p>Стоимость, ₽</p>
                            <FormInput
                                width="402px"
                                placeholder="Стоимость занятия"
                                type="number"
                                {...register('price', {
                                    required:
                                        'Поле "Стоимость занятия" обязательна к заполнению',
                                })}
                                error={!!errors.price}
                            />
                        </div>
                        <div>
                            <p>Дата</p>
                            <FormInput
                                width="402px"
                                placeholder="Дата проведения занятия"
                                type="date"
                                {...register('date', {
                                    required:
                                        'Поле "Дата" обязательна к заполнению',
                                })}
                                error={!!errors.date}
                            />
                        </div>
                        <div>
                            <p>Дата</p>
                            <FormInput
                                width="402px"
                                placeholder="Время занятия"
                                type="time"
                                {...register('time', {
                                    required:
                                        'Поле "Время" обязательна к заполнению',
                                })}
                                error={!!errors.time}
                            />
                        </div>
                        <div className={styles['form-btns']}>
                            <RedGradientButton
                                onClick={() => setCreateModalOpen(false)}
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
        </>
    );
};

export default AdminSchedulePage;
