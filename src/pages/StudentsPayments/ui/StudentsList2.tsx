import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid2 as Grid,
    IconButton,
    Box,
    TextField,
} from '@mui/material';
import { Payment } from '@/entities/lesson/model/types/payment';
import { CreatePayment, Student } from '@/entities/user';
import MenuSimple from './MenuSimple';
import AddIcon from '@mui/icons-material/Add';

type payData = Student & {
    payInfo: Payment;
};

export const StudentsList2: React.FC<{
    students: payData[];
    date: Date;
    update: boolean;
    setUpdater: Dispatch<SetStateAction<boolean>>;
}> = ({ students, date, update, setUpdater }) => {
    const onSubmit = (
        e: FormEvent<HTMLFormElement>,
        studentId: string
    ): void => {
        e.preventDefault();

        const input = document.querySelector('#add-to-price');
        if (input && input instanceof HTMLInputElement) {
            CreatePayment(
                studentId,
                date.toISOString().split('T')[0],
                String(input.value)
            ).then(() => setUpdater(!update));
        }
    };

    const renderMenu = (student: payData) => {
        const withoutEmpltyStrings = student.payInfo.payResponses.filter(
            (pay) => pay.image.length > 0
        );

        return withoutEmpltyStrings.length > 0 ? (
            <MenuSimple payData={withoutEmpltyStrings} />
        ) : (
            <p>Отсутствует</p>
        );
    };

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 6 }} sx={{ width: '100%' }}>
                <Paper elevation={3}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ученик</TableCell>
                                    <TableCell align="center">
                                        Кол-во посещений
                                    </TableCell>
                                    <TableCell align="center">
                                        Итоговая сумма
                                    </TableCell>
                                    <TableCell align="center">
                                        Внесено
                                    </TableCell>
                                    <TableCell align="center">
                                        Аванс/долг
                                    </TableCell>
                                    <TableCell align="center">Чеки</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map((student) => {
                                    const needToPay =
                                        student.payInfo.price *
                                        student.payInfo.num;
                                    const payed =
                                        needToPay - student.payInfo.sum;
                                    const diff = payed - needToPay;

                                    return (
                                        <TableRow key={student.id}>
                                            <TableCell>
                                                {student.fullName}
                                            </TableCell>
                                            <TableCell align="center">
                                                {`${student.payInfo.num}`}
                                            </TableCell>
                                            <TableCell align="center">
                                                {`${needToPay} ₽`}
                                            </TableCell>
                                            <TableCell align="center">
                                                {`${payed} ₽`}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{
                                                    color:
                                                        diff < 0
                                                            ? 'red'
                                                            : 'green',
                                                }}
                                            >
                                                {`${diff} ₽`}
                                            </TableCell>
                                            <TableCell align="center">
                                                {renderMenu(student)}
                                            </TableCell>
                                            <TableCell align="center">
                                                <form
                                                    onSubmit={(e) =>
                                                        onSubmit(e, student.id)
                                                    }
                                                >
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                        }}
                                                    >
                                                        <TextField
                                                            id="add-to-price"
                                                            variant="outlined"
                                                            sx={{
                                                                width: '100px',
                                                            }}
                                                            placeholder="Добавить к оплате"
                                                            type="number"
                                                        />
                                                        <IconButton
                                                            size="small"
                                                            style={{
                                                                marginRight:
                                                                    '-5px',
                                                            }}
                                                            type="submit"
                                                        >
                                                            <AddIcon />
                                                        </IconButton>
                                                    </Box>
                                                </form>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
};
