import { Attendance } from '@/entities/lesson';
import {
    getCurrentWeekDays,
    getPreviousWeekDays,
    getNextWeekDays,
} from '@/features/dateController';
import { Stack, Paper, IconButton, Typography, SxProps } from '@mui/material';
import React, { useState } from 'react';
import { ScheduleWindow } from '../ScheduleWindow/ScheduleWindow';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const weekDays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

const dynamicElValue = 'calc(100% / 8)';

const containerStyles: SxProps = {
    width: '100%',
    alignItems: 'center',
};

const firstLineStyles: SxProps = {
    width: '100%',
};

const headerStyle: SxProps = {
    width: dynamicElValue,
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    background: 'none',
};

const rowHeaderStyles: SxProps = {
    display: 'flex',
    width: dynamicElValue,
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
};

const btnStyle: SxProps = {
    border: '1px solid #000',
};

export const Table: React.FC<{ attendances: Attendance[] }> = ({
    attendances,
}) => {
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeekDays());

    const getState = (day: Date): 'empty' | 'red' | 'green' | 'unknown' => {
        const today = new Date();
        const dayStr = day.toISOString().split('T')[0];

        const attendance = attendances.find((att) => att.date === dayStr);
        if (attendance) {
            if (day < today) {
                if (attendance.isPresent) {
                    return 'green';
                }

                return 'red';
            }
            return 'empty';
        }

        return 'unknown';
    };

    return (
        <Stack spacing={2} sx={containerStyles}>
            <Stack direction="row" spacing={2} sx={firstLineStyles}>
                {currentWeek.map((day, index) => (
                    <Paper key={index} elevation={0} sx={headerStyle}>
                        {index === 0 && (
                            <IconButton
                                sx={btnStyle}
                                onClick={() =>
                                    setCurrentWeek(
                                        getPreviousWeekDays(currentWeek[0])
                                    )
                                }
                            >
                                <ArrowBackIcon sx={{ color: '#000' }} />
                            </IconButton>
                        )}
                        <Typography>{`${weekDays[day.getDay()]} ${day.getDate()}.${day.getMonth() + 1} ${day.getFullYear()}`}</Typography>
                        {index === currentWeek.length - 1 && (
                            <IconButton
                                sx={btnStyle}
                                onClick={() =>
                                    setCurrentWeek(
                                        getNextWeekDays(currentWeek[0])
                                    )
                                }
                            >
                                <ArrowForwardIcon sx={{ color: '#000' }} />
                            </IconButton>
                        )}
                    </Paper>
                ))}
            </Stack>
            <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                {currentWeek.map((day, rowIndex) => (
                    <Paper key={rowIndex} elevation={0} sx={rowHeaderStyles}>
                        <ScheduleWindow state={getState(day)} />
                    </Paper>
                ))}
            </Stack>
        </Stack>
    );
};
