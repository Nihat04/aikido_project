import styles from '../styles/index.module.css';

import { ThemeProvider } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AuthInput, AuthPasswordInput, AuthButton, TopLogo } from '.';
import { theme, handleErrors } from '../model';

import { MailIcon } from '../assets/components';
import { loginCoach, loginStudent } from '../api/login';
import { useAppDispatch } from '../../../features/store/hooks';
import { setUser } from '../../../features/store/user/userSlice';

export const AuthForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isCoach = searchParams.get('form') === 'authCoach';
    const onSubmit = async (data: FieldValues) => {
        try {
            if (isCoach) {
                const coachID = await loginCoach(data);
                dispatch(setUser({ id: coachID, role: 'coach' }));
                navigate('/');
            } else {
                const { id, fullName } = await loginStudent(data);
                dispatch(setUser({ id: id, role: 'student', fullName }));
                navigate('/');
            }
        } catch (error) {
            setError('global', {
                type: 'server',
                message: `${error}`,
            });
        }
    };

    return (
        <div className={styles['container']}>
            <TopLogo />
            <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
                <ThemeProvider theme={theme}>
                    <div className={styles['form__inps']}>
                        <AuthInput
                            label="Логин"
                            type="text"
                            endAdorment={<MailIcon />}
                            formRegister={register('login', {
                                required:
                                    'Поле "Логин" обязательна к заполнению',
                            })}
                        />
                        <AuthPasswordInput
                            label="Пароль"
                            formRegister={register('password', {
                                required:
                                    'Поле "Пароль" обязательна к заполнению',
                            })}
                        />
                        {handleErrors(errors).map((errorMsg, index) => (
                            <p
                                key={index}
                                className={styles['form__error-msg']}
                            >
                                {errorMsg}
                            </p>
                        ))}
                    </div>
                    <AuthButton type="submit">Войти</AuthButton>
                </ThemeProvider>
            </form>
            <p className={styles['bottom-text']}>Забыли пароль? </p>
        </div>
    );
};
