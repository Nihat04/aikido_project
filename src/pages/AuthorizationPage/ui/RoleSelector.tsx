import pageStyles from '../styles/index.module.css';
import styles from '../styles/RoleSelector.module.css';

import { TopLogo, AuthButton } from '.';
import { useSearchParams } from 'react-router-dom';

export const RoleSelector = () => {
    const [, setSearchParams] = useSearchParams();

    return (
        <div className={pageStyles['container']}>
            <TopLogo />
            <p className={styles['text']}>Продложить, как:</p>
            <div className={styles['btns']}>
                <AuthButton
                    onClick={() => setSearchParams({ form: 'authStudent' })}
                    className={styles['btn']}
                >
                    Обучающийся
                </AuthButton>
                <AuthButton
                    onClick={() => setSearchParams({ form: 'auth' })}
                    className={styles['btn']}
                >
                    Тренер
                </AuthButton>
            </div>
        </div>
    );
};
