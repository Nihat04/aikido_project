import { Button } from '@mui/material';
import { ReactNode } from 'react';

export const RedGradientButton = ({
    children,
    className,
    onClick,
    type = 'button',
}: {
    children: ReactNode;
    className?: string;
    onClick?: (data: object) => void;
    type?: 'button' | 'submit' | 'reset';
}) => {
    return (
        <Button
            variant="contained"
            className={className}
            type={type}
            onClick={onClick}
            sx={{
                padding: '14px 20px',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: '600',
                background: 'linear-gradient(45deg, #a82222 0%, #fd6262 100%)',
                borderRadius: '15px',
            }}
        >
            {children}
        </Button>
    );
};
