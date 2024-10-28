import { InputAdornment, TextField } from '@mui/material';
import { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export const AuthInput = ({
    label,
    type = 'text',
    endAdorment,
    formRegister,
    error = false,
}: {
    label: string;
    type?: 'text' | 'password' | 'email';
    endAdorment: ReactNode;
    formRegister: UseFormRegisterReturn;
    error?: boolean;
}) => {
    return (
        <TextField
            {...formRegister}
            label={label}
            type={type}
            size="small"
            error={error}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            {endAdorment}
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
};
