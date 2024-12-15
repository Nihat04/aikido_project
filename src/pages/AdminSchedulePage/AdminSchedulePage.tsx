import React, { useEffect, useState } from 'react';

import Header from '@/widgets/Header/Header';
import { ScheduleTable } from '@/widgets/Schedule/ui';
import { getLessons } from '@/entities/lesson';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/store/store';
import { useNavigate } from 'react-router-dom';

const AdminSchedulePage: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.logedIn) {
            if (user.user?.role !== 'coach') {
                navigate('/');
            }
        }

        if (user.user?.id) {
            getLessons(user.user?.id).then((res) => setLessons(res));
        }
    }, [user]);

    return (
        <>
            <Header />
            <main>
                <section>
                    <ScheduleTable lessons={lessons} />
                </section>
            </main>
        </>
    );
};

export default AdminSchedulePage;
