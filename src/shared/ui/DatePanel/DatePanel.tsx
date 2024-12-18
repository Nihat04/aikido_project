import { Box, IconButton, Stack, SxProps } from '@mui/material';
import React from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const month = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

type DatePanelProps = {
    title: string;
    date: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const btnStyle: SxProps = {
    border: '1px solid #000',
};

export const DatePanel: React.FC<DatePanelProps> = ({
    title,
    date,
    setDate,
}) => {
    const setNewDate = (date: Date): void => {
        setDate(new Date(date.getTime()));
    };

    const prevMonth = (date: Date): void => {
        changeMonth(date, 'minus');
    };

    const nextMonth = (date: Date): void => {
        changeMonth(date, 'plus');
    };

    const changeMonth = (date: Date, operation: 'plus' | 'minus') => {
        const newDate = new Date(date);

        if (operation === 'plus') {
            newDate.setMonth(newDate.getMonth() + 1);
        }

        if (operation === 'minus') {
            newDate.setMonth(newDate.getMonth() - 1);
        }

        setNewDate(newDate);
    };

    return (
        <Box
            sx={{
                padding: '20px',
                width: 'max-content',
                textAlign: 'center',
                backgroundColor: '#fff',
                borderRadius: '15px',
            }}
        >
            <p style={{ marginBottom: '5px' }}>{title}</p>
            <Stack direction={'row'} spacing={2}>
                <IconButton sx={btnStyle} onClick={() => prevMonth(date)}>
                    <ArrowBackIcon sx={{ color: '#000' }} />
                </IconButton>
                <Box
                    sx={{
                        padding: '10px 0',
                        width: '283px',
                        textAlign: 'center',
                        backgroundColor: '#E2E2E2',
                        border: '2px solid #000',
                        borderRadius: '15px',
                    }}
                >
                    {`${month[date.getMonth()]} ${date.getFullYear()}`}
                </Box>
                <IconButton sx={btnStyle} onClick={() => nextMonth(date)}>
                    <ArrowForwardIcon sx={{ color: '#000' }} />
                </IconButton>
            </Stack>
        </Box>
    );
};
