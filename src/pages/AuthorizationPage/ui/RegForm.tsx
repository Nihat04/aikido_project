import styles from '../styles/index.module.css';

import { ThemeProvider } from '@emotion/react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';

import { handleErrors, theme } from '../model';
import { AuthButton, AuthInput, AuthPasswordInput, TopLogo } from '.';

import { MailIcon, EditProfileIcon } from '../assets/components';
import { registerUser } from '../api/signup';

export const RegForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();
    const [, setSearchParams] = useSearchParams();
    const onSubmit = async (data: FieldValues) => {
        if (data.password !== data.confirmPassword) {
            setError('global', {
                type: 'pattern',
                message: 'Пароли не совпадают',
            });
            return;
        }
        try {
            const isSuccessfull = await registerUser(data);
            if (isSuccessfull) {
                setSearchParams((params) => {
                    params.set('form', 'auth');
                    return params;
                });
            }
        } catch {
            setError('global', {
                type: 'server',
                message: 'Ошибка запроса на бэк',
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
                            label="Имя"
                            type="text"
                            endAdorment={<EditProfileIcon />}
                            formRegister={register('fullName', {
                                required: 'Поле "Имя" обязательна к заполнению',
                                minLength: {
                                    value: 2,
                                    message:
                                        'Имя должно состоять минимум из 2 символов',
                                },
                            })}
                        />
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
                        <AuthPasswordInput
                            label="Повторите пароль"
                            formRegister={register('confirmPassword', {
                                required:
                                    'Поле "Повторите пароль" обязательна к заполнению',
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
                    <AuthButton type="submit">Создать аккаунт</AuthButton>
                </ThemeProvider>
            </form>
            <p className={styles['bottom-text']}>
                Уже есть аккаунт?{' '}
                <Link className={styles['link']} to={'/login?form=auth'}>
                    Войти тут
                </Link>
            </p>
        </div>
    );
};
