import styles from './index.module.css';

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Modal } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';

import { RootState } from '@/features/store/store';
import { createGroup, getGroups, Group } from '@/entities/group/index';

import Header from '@/widgets/Header/Header';
import GroupItem from '@/widgets/Group';
import { RedGradientButton } from '@/shared/ui';
import { FormInput } from '@/shared/ui/Inputs';

const GroupsPage = () => {
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm();

    const user = useSelector((state: RootState) => state.user.user);
    const [groups, setGroups] = useState<Group[]>([]);
    const [createGroupModal, setCerateGroupModal] = useState<boolean>(false);
    const [updater, setUpdater] = useState<boolean>(false);
    useEffect(() => {
        if (user) {
            getGroups(user.id).then((res) => setGroups(res));
        }
    }, [user, updater]);

    const onSubmit = (handleSubmit: FieldValues) => {
        if (user?.id) {
            createGroup(user?.id, handleSubmit.groupName).then(() =>
                getGroups(user.id).then((res) => setGroups(res))
            );
            setCerateGroupModal(false);
        }
    };

    return (
        <>
            <Header />
            <main>
                <section>
                    <Box sx={{ marginBottom: '30px' }}>
                        {groups.map((group, index) => (
                            <div key={index} className={styles['group']}>
                                <GroupItem
                                    group={group}
                                    updater={{
                                        state: updater,
                                        setter: setUpdater,
                                    }}
                                />
                            </div>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <RedGradientButton
                            onClick={() => setCerateGroupModal(true)}
                        >
                            Создать Группу
                        </RedGradientButton>
                    </Box>
                </section>
            </main>
            <Modal
                onClose={() => setCerateGroupModal(false)}
                open={createGroupModal}
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
                    <p className={styles['modal-title']}>Создать группу</p>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={styles['form']}
                    >
                        <FormInput
                            width="402px"
                            placeholder="Название"
                            type="text"
                            {...register('groupName')}
                        />
                        <div className={styles['form-btns']}>
                            <RedGradientButton
                                onClick={() => setCerateGroupModal(false)}
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

export default GroupsPage;
