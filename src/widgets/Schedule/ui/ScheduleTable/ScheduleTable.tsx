import {
    Grid2 as Grid,
    Box,
    Typography,
    Button,
    createTheme,
    ThemeProvider,
} from '@mui/material';
import React from 'react';

const gridTheme = createTheme({
    components: {
        MuiGrid2: {
            styleOverrides: {
                root: {
                    gridTemplateRows:
                        '100px 100px 100px 100px 100px 100px 100px 100px',
                },
            },
        },
    },
});

export const ScheduleTable = () => {
    const timeSlots = [
        '8:00-10:00',
        '10:00-12:00',
        '12:00-14:00',
        '14:00-16:00',
        '16:00-18:00',
        '20:00-22:00',
    ];
    const days = [
        'ПН 28.10',
        'ВТ 29.10',
        'СР 30.10',
        'ЧТ 31.10',
        'ПТ 2.11',
        'СБ 3.11',
        'ВС 4.11',
    ];

    return (
        <ThemeProvider theme={gridTheme}>
            <Grid container spacing={2}>
                {/* Header Row */}
                <Grid size={{ xs: 2 }}>
                    <Box />
                </Grid>
                {days.map((day, index) => (
                    <Grid size={{ xs: 2 }} key={index}>
                        <Typography variant="h6" align="center">
                            {day}
                        </Typography>
                    </Grid>
                ))}

                {/* Time Slot Rows */}
                {timeSlots.map((slot, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        <Grid size={{ xs: 2 }}>
                            <Typography variant="body1" align="center">
                                {slot}
                            </Typography>
                        </Grid>
                        {days.map((_, colIndex) => (
                            <Grid size={{ xs: 2 }} key={colIndex}>
                                <Box
                                    sx={{
                                        border: '1px solid #ccc',
                                        height: '100px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#f5f5f5',
                                    }}
                                >
                                    {/* Add content or a button to add content */}
                                    {rowIndex === 0 && colIndex === 0 && (
                                        <Button variant="outlined">+</Button>
                                    )}
                                    {/* Example content */}
                                    {rowIndex === 1 && colIndex === 1 && (
                                        <Typography>Группа AT-05</Typography>
                                    )}
                                    {rowIndex === 2 && colIndex === 1 && (
                                        <Typography>Группа AT-06</Typography>
                                    )}
                                </Box>
                            </Grid>
                        ))}
                    </React.Fragment>
                ))}
            </Grid>
        </ThemeProvider>
    );
};
