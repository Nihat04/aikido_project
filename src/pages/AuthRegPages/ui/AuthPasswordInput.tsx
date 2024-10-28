import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AuthInput } from './AuthInput';

import { IconButton } from '@mui/material';

import { VisibleIcon, UnvisibleIcon } from '../assets/components';

export const AuthPasswordInput = ({
    label,
    formRegister,
    error = false,
}: {
    label: string;
    formRegister: UseFormRegisterReturn;
    error?: boolean;
}) => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    return (
        <AuthInput
            label={label}
            type={passwordVisible ? 'text' : 'password'}
            endAdorment={
                <IconButton
                    size="small"
                    style={{ marginRight: '-5px' }}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                >
                    {passwordVisible ? <UnvisibleIcon /> : <VisibleIcon />}
                </IconButton>
            }
            formRegister={formRegister}
            error={error}
        />
    );
};
