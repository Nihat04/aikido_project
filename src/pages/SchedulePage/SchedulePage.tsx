import { Attendance, getAttendances } from '@/entities/lesson';
import { RootState } from '@/features/store/store';
import Header from '@/widgets/Header/Header';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table } from './ui/Table/Table';

const SchedulePage: React.FC = () => {
    const [attendances, setAttendances] = useState<Attendance[]>([]);
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (user.user && user.user.role === 'student')
            getAttendances(user.user?.id).then((res) => setAttendances(res));
    }, [user]);
    return (
        <>
            <Header />
            <main>
                <section>
                    <Table attendances={attendances} />
                </section>
            </main>
        </>
    );
};

export default SchedulePage;
