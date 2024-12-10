import { TextField, TextFieldProps } from '@mui/material';

export const FormInput: React.FC<
    Omit<TextFieldProps, 'sx' | 'variant'> & { width?: string }
> = ({ width, ...props }) => {
    return (
        <TextField
            style={{ fontSize: '20px', fontWeight: '600' }}
            sx={{ width: width }}
            {...props}
        />
    );
};
