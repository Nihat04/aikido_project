import styles from './styles/index.module.css';

import { RedGradientButton } from '../../shared/ui';

import imagePlaceholder from '../../shared/assets/img/img_placeholder.jpeg';

import Header from '../../widgets/Header/Header';

const ProfilePage = () => {
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
                                            sx={{
                                                fontSize: '20px',
                                                lineHeight: '120%',
                                                letterSpacing: '0.01em',
                                                color: '#fff',
                                            }}
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
                                    {`Иванов Иван Иванович, 13 лет`}
                                </p>
                            </div>
                            <div className={styles['profile__data']}>
                                <div
                                    className={styles['profile__data__section']}
                                >
                                    <p
                                        className={
                                            styles[
                                                'profile__data_section__header'
                                            ]
                                        }
                                    >
                                        Личные данные
                                    </p>
                                    <div
                                        className={
                                            styles[
                                                'profile__data__section__form'
                                            ]
                                        }
                                    >
                                        <div>
                                            <p
                                                className={
                                                    styles[
                                                        'profile__data__header'
                                                    ]
                                                }
                                            >
                                                Пол
                                            </p>
                                            <select
                                                className={
                                                    styles[
                                                        'profile__data__input'
                                                    ]
                                                }
                                                name=""
                                                id=""
                                            >
                                                <option value="">
                                                    Мужской
                                                </option>
                                                <option value="">
                                                    Женский
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <p
                                                className={
                                                    styles[
                                                        'profile__data__header'
                                                    ]
                                                }
                                            >
                                                Класс в школе
                                            </p>
                                            <input
                                                className={
                                                    styles[
                                                        'profile__data__input'
                                                    ]
                                                }
                                                type="text"
                                                placeholder="Введите ваш школьный класс"
                                            />
                                        </div>
                                        <div>
                                            <p
                                                className={
                                                    styles[
                                                        'profile__data__header'
                                                    ]
                                                }
                                            >
                                                Дата рождения
                                            </p>
                                            <input
                                                className={
                                                    styles[
                                                        'profile__data__input'
                                                    ]
                                                }
                                                type="date"
                                            />
                                        </div>
                                        <div>
                                            <p
                                                className={
                                                    styles[
                                                        'profile__data__header'
                                                    ]
                                                }
                                            >
                                                Адрес
                                            </p>
                                            <input
                                                className={
                                                    styles[
                                                        'profile__data__input'
                                                    ]
                                                }
                                                type="text"
                                                placeholder="Введите ваш вдрес вашего проживания"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={styles['profile__data__section']}
                                >
                                    <p
                                        className={
                                            styles[
                                                'profile__data_section__header'
                                            ]
                                        }
                                    >
                                        Контакты
                                    </p>
                                    <div
                                        className={
                                            styles[
                                                'profile__data__section__form'
                                            ]
                                        }
                                    >
                                        <div>
                                            <p
                                                className={
                                                    styles[
                                                        'profile__data__header'
                                                    ]
                                                }
                                            >
                                                Телефон
                                            </p>
                                            <input
                                                className={
                                                    styles[
                                                        'profile__data__input'
                                                    ]
                                                }
                                                type="text"
                                            />
                                        </div>
                                        <div>
                                            <p
                                                className={
                                                    styles[
                                                        'profile__data__header'
                                                    ]
                                                }
                                            >
                                                Почта
                                            </p>
                                            <input
                                                className={
                                                    styles[
                                                        'profile__data__input'
                                                    ]
                                                }
                                                type="email"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ProfilePage;
