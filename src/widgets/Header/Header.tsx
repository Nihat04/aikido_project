import styles from './styles/index.module.css';

import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { IconButton } from '@mui/material';

import logo from '../../shared/assets/img/logo.png';
import avatarPlaceholder from '../../shared/assets/img/avatarPlaceholder.png';

import { LogoutIcon } from './assets/components';
import { useSelector } from 'react-redux';
import { RootState } from '../../features/store/store';

import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

type navLink = {
    label: string;
    path: string;
};

const COACH_LINKS: navLink[] = [
    { label: 'группы', path: '/groups' },
    { label: 'ученики', path: '/students' },
    { label: 'создать расписание', path: '/manageSchedule' },
    { label: 'отметить посещение', path: '/attendance' },
    { label: 'оплата занятий', path: '/managePays' },
];

const STUDENT_LINKS: navLink[] = [
    { label: 'посещение', path: '/activity' },
    { label: 'оплата занятий', path: '/pay' },
];

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
    const [navVisible, setNavVisible] = useState(false);

    const renderLinks = () => {
        if (!user.logedIn) return;

        let links: navLink[] = COACH_LINKS;

        if (user.user?.role === 'student') {
            links = STUDENT_LINKS;
        }

        return links.map((link, index) => (
            <Link
                key={index}
                className={classNames(styles['nav__link'], {
                    [styles['nav__link--active']]:
                        location.pathname === link.path,
                })}
                to={link.path}
            >
                {link.label}
            </Link>
        ));
    };

    return (
        <header className={styles['header']}>
            <div className={styles['container']}>
                <IconButton
                    aria-label="delete"
                    className={styles['burger-btn']}
                    onClick={() => setNavVisible(!navVisible)}
                >
                    <MenuIcon />
                </IconButton>
                <div className={styles['logo']}>
                    <Link className={styles['logo']} to={'/'}>
                        <img className={styles['logo__img']} src={logo} />
                        <p className={styles['logo__text']}>Dolma&nbsp;Dojo</p>
                    </Link>
                </div>
                <nav
                    className={classNames(styles['nav'], {
                        [styles['nav--show']]: navVisible,
                    })}
                >
                    {renderLinks()}
                </nav>
                <div className={styles['profile']}>
                    {user.logedIn ? (
                        <>
                            <Link
                                className={styles['profile__name']}
                                to={'/account'}
                            >
                                Мой профиль
                            </Link>
                            <img
                                className={styles['profile__img']}
                                src={avatarPlaceholder}
                            />
                            <IconButton
                                onClick={() => {
                                    localStorage.removeItem('user');
                                    navigate('/');
                                    location.reload();
                                }}
                            >
                                <LogoutIcon />
                            </IconButton>
                        </>
                    ) : (
                        <Link className={styles['log-text']} to={'/login'}>
                            Войти
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
