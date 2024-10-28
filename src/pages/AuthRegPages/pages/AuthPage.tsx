import styles from '../styles/index.module.css';

import { ThemeProvider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { AuthInput, AuthPasswordInput, AuthButton, TopLogo } from '../ui';
import { theme, handleErrors } from '../model';

import { MailIcon } from '../assets/components';

export const AuthPage = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = () => {
        setError('global', {
            type: 'server',
            message: 'Ошибка запроса на бэк',
        });
    };

    return (
        <div className={styles['container']}>
            <TopLogo />
            <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
                <ThemeProvider theme={theme}>
                    <div className={styles['form__inps']}>
                        <AuthInput
                            label="Почта"
                            type="text"
                            endAdorment={<MailIcon />}
                            formRegister={register('email', {
                                required:
                                    'Поле "Почта" обязательна к заполнению',
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]/,
                                    message: 'Формат почты неправильный',
                                },
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
            <p className={styles['bottom-text']}>
                Забыли пароль?{' '}
                <Link className={styles['link']} to={'/register'}>
                    Зарегестрироваться
                </Link>
            </p>
        </div>
    );
};
