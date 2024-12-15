import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

export const FormInput = React.forwardRef<
    HTMLDivElement,
    Omit<TextFieldProps, 'sx' | 'variant'> & { width?: string }
>(({ width, ...props }, ref) => {
    return (
        <TextField
            variant="outlined"
            style={{ fontSize: '20px', fontWeight: '600' }}
            sx={{ width: width }}
            inputRef={ref}
            {...props}
        />
    );
});
