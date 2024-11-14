import pageStyles from '../styles/index.module.css';
import styles from '../styles/RoleSelector.module.css';

import { TopLogo } from '.';
import { RedGradientButton } from '../../../shared/ui';
import { useSearchParams } from 'react-router-dom';

export const RoleSelector = () => {
    const [, setSearchParams] = useSearchParams();

    return (
        <div className={pageStyles['container']}>
            <TopLogo />
            <p className={styles['text']}>Продложить, как:</p>
            <div className={styles['btns']}>
                <RedGradientButton
                    onClick={() =>
                        setSearchParams((params) => {
                            params.set('form', 'authStudent');
                            return params;
                        })
                    }
                    className={styles['btn']}
                >
                    Обучающийся
                </RedGradientButton>
                <RedGradientButton
                    onClick={() =>
                        setSearchParams((params) => {
                            params.set('form', 'authCoach');
                            return params;
                        })
                    }
                    className={styles['btn']}
                >
                    Тренер
                </RedGradientButton>
            </div>
        </div>
    );
};
