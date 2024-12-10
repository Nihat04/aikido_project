import styles from './index.module.css';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/features/store/store';
import { getGroups, Group } from '@/entities/group/index';

import Header from '@/widgets/Header/Header';
import GroupItem from '@/widgets/Group';

const GroupsPage = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        if (user) {
            getGroups(user.id).then((res) => setGroups(res));
        }
    }, [user]);

    return (
        <>
            <Header />
            <main>
                {groups.map((group, index) => (
                    <div key={index} className={styles['group']}>
                        <GroupItem group={group} />
                    </div>
                ))}
            </main>
        </>
    );
};

export default GroupsPage;
