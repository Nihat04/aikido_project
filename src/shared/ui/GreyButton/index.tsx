import { Button } from '@mui/material';
import React from 'react';

export const GreyButton: React.FC<{
    children: string;
    onClick: () => void;
}> = ({ children, onClick }) => {
    return (
        <Button
            onClick={onClick}
            variant="outlined"
            sx={{
                padding: '13px 32px',
                color: '#000',
                fontWeight: '600',
                backgroundColor: '#E2E2E2',
                borderColor: '#000',
                borderRadius: '15px',
            }}
        >
            {children}
        </Button>
    );
};
