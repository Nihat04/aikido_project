import Header from '@/widgets/Header/Header';
import { ScheduleTable } from '@/widgets/Schedule/ui';
import React from 'react';

const AdminSchedulePage: React.FC = () => {
    return (
        <>
            <Header />
            <main>
                <section>
                    <ScheduleTable />
                </section>
            </main>
        </>
    );
};

export default AdminSchedulePage;
