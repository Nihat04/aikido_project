import React from 'react';
import { Paper, Button, Typography } from '@mui/material';

type SheduleWindowProps = {
    eventName?: string;
    onClick?: () => void;
    state: 'empty' | 'filled';
};

export const SheduleWindow: React.FC<SheduleWindowProps> = ({
    eventName,
    onClick,
    state,
}) => {
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
            {state === 'empty' && (
                <Button
                    onClick={onClick}
                    variant="outlined"
                    sx={{
                        aspectRatio: '1',
                        color: '#000',
                        fontSize: '30px',
                        border: '2px solid #000',
                        borderRadius: '100%',
                        opacity: '0',
                        ':hover': {
                            opacity: '1',
                        },
                    }}
                >
                    +
                </Button>
            )}
            {/* Example content */}
            {state === 'filled' && <Typography>{eventName}</Typography>}
        </Paper>
    );
};
