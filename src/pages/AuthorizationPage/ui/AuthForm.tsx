import styles from '../styles/index.module.css';

import { ThemeProvider } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AuthInput, AuthPasswordInput, TopLogo } from '.';
import { handleErrors } from '../model';
import { RedGradientButton } from '../../../shared/ui';

import { MailIcon } from '../assets/components';
import { loginCoach, loginStudent } from '../api/login';
import { useAppDispatch } from '../../../features/store/hooks';
import { authUser } from '../../../features/store/user/userSlice';
import { authTheme } from '../../../features/mui';

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
                dispatch(authUser({ id: coachID, role: 'coach' }));
                navigate('/');
            } else {
                const { id, fullName } = await loginStudent(data);
                dispatch(authUser({ id: id, role: 'student', fullName }));
                navigate('/');
            }
        } catch (error) {
            setError('login', {
                type: 'server',
                message: `${error}`,
            });
        }
    };

    return (
        <div className={styles['container']}>
            <TopLogo />
            <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
                <ThemeProvider theme={authTheme}>
                    <div className={styles['form__inps']}>
                        <AuthInput
                            label="Логин"
                            type="text"
                            endAdorment={<MailIcon />}
                            formRegister={register('login', {
                                required:
                                    'Поле "Логин" обязательна к заполнению',
                            })}
                            error={errors.login}
                        />
                        <AuthPasswordInput
                            label="Пароль"
                            formRegister={register('password', {
                                required:
                                    'Поле "Пароль" обязательна к заполнению',
                            })}
                            error={errors.password}
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
                    <RedGradientButton type="submit">Войти</RedGradientButton>
                </ThemeProvider>
            </form>
            <p className={styles['bottom-text']}>Забыли пароль? </p>
        </div>
    );
};
