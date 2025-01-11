import React from 'react';
import { Paper, Typography, useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';

type SheduleWindowProps = {
    eventName?: string;
    state: 'empty' | 'filled';
};

export const SheduleWindow: React.FC<SheduleWindowProps> = ({
    eventName,
    state,
}) => {
    const matches = useMediaQuery(
        json2mq({
            maxWidth: 810,
        })
    );

    return (
        <Paper
            elevation={0}
            sx={{
                width: 'calc(100% / 8)',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
            }}
        >
            {/* Content goes here */}
            {state === 'empty' && <></>}
            {/* Example content */}
            {state === 'filled' && (
                <Typography
                    sx={
                        matches && {
                            fontSize: '12px',
                            writingMode: 'vertical-rl',
                            textOrientation: 'upright',
                        }
                    }
                >
                    {eventName}
                </Typography>
            )}
        </Paper>
    );
};
