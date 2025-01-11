import { TextField, TextFieldProps, useMediaQuery } from '@mui/material';
import React from 'react';
import json2mq from 'json2mq';

export const FormInput = React.forwardRef<
    HTMLDivElement,
    Omit<TextFieldProps, 'sx' | 'variant'> & { width?: string }
>(({ width, ...props }, ref) => {
    const matches = useMediaQuery(
        json2mq({
            maxWidth: 600,
        })
    );

    return (
        <TextField
            variant="outlined"
            style={
                matches
                    ? { fontSize: '10px', fontWeight: '600' }
                    : { fontSize: '20px', fontWeight: '600' }
            }
            sx={matches ? { width: '100%' } : { width: width }}
            inputRef={ref}
            {...props}
        />
    );
});
