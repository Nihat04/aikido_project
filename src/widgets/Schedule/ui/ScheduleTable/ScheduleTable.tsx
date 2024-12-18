import { Typography, Stack, Paper, SxProps, IconButton } from '@mui/material';

import { SheduleWindow } from '../ScheduleWindow/ScheduleWindow';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
    getCurrentWeekDays,
    getNextWeekDays,
    getPreviousWeekDays,
} from '@/features/dateController';
import React, { useMemo, useState } from 'react';
import { Lesson } from '@/entities/lesson';

const weekDays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

const timeSlots = [
    new Date(0, 0, 0, 10, 0),
    new Date(0, 0, 0, 12, 0),
    new Date(0, 0, 0, 14, 0),
    new Date(0, 0, 0, 16, 0),
];

const formatTime = (
    date: Date,
    options?: Partial<{
        addHours: number;
        addMinutes: number;
    }>
) => {
    const { addHours = 0, addMinutes = 0 } = options || {}; // Default to empty object if options is undefined
    const hours = String(date.getHours() + addHours).padStart(2, '0');
    const minutes = String(date.getMinutes() + addMinutes).padStart(2, '0');
    return `${hours}:${minutes}`;
};

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

export const ScheduleTable: React.FC<{ lessons: Lesson[] }> = ({ lessons }) => {
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeekDays());

    const tableLessons = useMemo(() => {
        const lsns: { [key: number]: JSX.Element } = {};
        timeSlots.map((slot) => {
            const endTime = new Date(slot.getTime());
            endTime.setHours(endTime.getHours() + 2);
            currentWeek.map((day, colIndex) => {
                for (const lesson of lessons) {
                    const date = new Date(lesson.date);
                    const time = new Date('1899-12-31T' + lesson.time);

                    if (date.getDay() === day.getDay()) {
                        if (time >= slot && time < endTime) {
                            const overallDateMillis =
                                slot.getTime() + day.getTime();

                            lsns[overallDateMillis] = (
                                <SheduleWindow
                                    state="filled"
                                    eventName={lesson.groupName}
                                    key={colIndex}
                                />
                            );
                        }
                    }
                }
            });
        });

        return lsns;
    }, [lessons, currentWeek]);

    return (
        <Stack spacing={2} sx={containerStyles}>
            <Stack direction="row" spacing={2} sx={firstLineStyles}>
                <Paper
                    elevation={1}
                    sx={{
                        width: dynamicElValue,
                        height: '50px',
                        visibility: 'hidden',
                    }}
                />
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
                        <Typography>{`${weekDays[day.getDay()]} ${day.getDate()}.${day.getMonth() + 1}`}</Typography>
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

            {/* Time Slot Rows */}
            {timeSlots.map((slot, rowIndex) => (
                <Stack
                    key={rowIndex}
                    direction="row"
                    spacing={2}
                    sx={{ width: '100%' }}
                >
                    <Paper elevation={0} sx={rowHeaderStyles}>
                        <Typography variant="body1">
                            {`${formatTime(slot)}-${formatTime(slot, { addHours: 2 })}`}
                        </Typography>
                    </Paper>
                    {currentWeek.map(
                        (day, colIndex) =>
                            tableLessons[day.getTime() + slot.getTime()] || (
                                <SheduleWindow state="empty" key={colIndex} />
                            )
                    )}
                </Stack>
            ))}
        </Stack>
    );
};
