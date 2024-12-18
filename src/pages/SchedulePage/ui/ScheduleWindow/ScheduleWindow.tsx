import { Paper } from '@mui/material';
import React from 'react';

type SheduleWindowProps = {
    state: 'empty' | 'red' | 'green' | 'unknown';
};

export const ScheduleWindow: React.FC<SheduleWindowProps> = ({ state }) => {
    const getColor = () => {
        switch (state) {
            case 'empty':
                return '#f5f5f5';
            case 'green':
                return '#7DD289';
            case 'red':
                return '#F05252';
            default:
                return '#858585';
        }
    };

    return (
        <Paper
            elevation={0}
            sx={{
                width: '100%',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: getColor(),
            }}
        ></Paper>
    );
};
