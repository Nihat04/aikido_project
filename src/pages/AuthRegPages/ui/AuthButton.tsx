import { Button } from '@mui/material';
import { ReactNode } from 'react';

export const AuthButton = ({
    children,
    onClick,
    type = 'button',
}: {
    children: ReactNode;
    onClick?: (data: object) => void;
    type?: 'button' | 'submit' | 'reset';
}) => {
    return (
        <Button
            variant="contained"
            type={type}
            onClick={onClick}
            sx={{
                padding: '12px 0',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: '600',
                background: 'linear-gradient(45deg, #a82222 0%, #fd6262 100%)',
                borderRadius: '20px',
            }}
        >
            {children}
        </Button>
    );
};
