import { createTheme } from '@mui/material';

// each theme most likely must have commonSettings;
const commonSettings = {
    typography: {
        fontFamily: ['Montserrat', 'sans-serif'].join(','),
    },
};

export const defaultTheme = createTheme({
    ...commonSettings,
});

export const authTheme = createTheme({
    ...commonSettings,
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '15px',
                    fontSize: '15px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'gray',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'gray', // Default label color
                    '&.Mui-focused': {
                        color: 'black', // Label color on focus
                    },
                },
            },
        },
    },
});
