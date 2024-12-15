import { Button, ButtonProps } from '@mui/material';
import React from 'react';

export const RedGradientButton: React.FC<Omit<ButtonProps, 'ref'>> = ({
    children,
    onClick,
    type = 'button',
    sx,
}) => {
    return (
        <Button
            variant="contained"
            type={type}
            onClick={onClick}
            sx={{
                padding: '14px 20px',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: '600',
                background: 'linear-gradient(45deg, #a82222 0%, #fd6262 100%)',
                borderRadius: '15px',
                ...sx,
            }}
        >
            {children}
        </Button>
    );
};
