import styles from './styles/index.module.css';

import { useSelector } from 'react-redux';

import { RootState } from '../../features/store/store';
import { RedGradientButton } from '../../shared/ui';

import imagePlaceholder from '../../shared/assets/img/img_placeholder.jpeg'

import Header from '../../widgets/Header/Header';

const ProfilePage = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <>
            <Header />
            <main>
                <div className={styles['container']}>
                    <div className={styles['left-side']}>
                        <section className={styles['navigation']}>
                            <nav className={styles['nav']}>
                                <ul className={styles['nav__list']}>
                                    <li className={styles['nav__item']}>
                                        <RedGradientButton
                                            className={styles['nav__item__btn']}
                                        >
                                            Общие данные
                                        </RedGradientButton>
                                    </li>
                                </ul>
                            </nav>
                        </section>
                    </div>
                    <div className={styles['right-side']}>
                        <section className={styles['profile']}>
                            <div className={styles['profile__name']}>
                                <img
                                    className={styles['profile__img']}
                                    src={imagePlaceholder}
                                    alt="фото пользователя"
                                />
                                <p className={styles['profile__fullname']}>
                                    Иванов Иван Иванович, 13 лет
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ProfilePage;
