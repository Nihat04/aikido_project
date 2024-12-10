import React from 'react';

import { IconButton, IconButtonProps } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';

export const DeleteBtn: React.FC<Omit<IconButtonProps, 'sx'>> = ({
    ...props
}) => {
    return (
        <IconButton
            sx={{
                width: '18px',
                height: '18px',
                background: '#FF0000',
                border: '2px solid #000',
            }}
            {...props}
        >
            <ClearIcon
                sx={{
                    width: '14px',
                    height: '14px',
                }}
            />
        </IconButton>
    );
};
