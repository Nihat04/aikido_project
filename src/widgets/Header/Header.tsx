import styles from './styles/index.module.css';

import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { IconButton } from '@mui/material';

import logo from '../../shared/assets/img/logo.png';
import avatarPlaceholder from '../../shared/assets/img/avatarPlaceholder.png';

import { LogoutIcon } from './assets/components';

type navLink = {
    label: string;
    path: string;
};

const NAV_LINKS: navLink[] = [
    { label: 'расписание', path: '/schedule' },
    { label: 'группы', path: '/groups' },
    { label: 'журнал посещения', path: '/visits' },
];

const Header = () => {
    return (
        <header className={styles['header']}>
            <div className={styles['container']}>
                <div className={styles['logo']}>
                    <Link className={styles['logo']} to={'/'}>
                        <img className={styles['logo__img']} src={logo} />
                        <p className={styles['logo__text']}>Название школы</p>
                    </Link>
                </div>
                <nav className={styles['nav']}>
                    {NAV_LINKS.map((link, index) => (
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
                    ))}
                </nav>
                <div className={styles['profile']}>
                    <Link className={styles['profile__name']} to={'/login'}>
                        Мой профиль
                    </Link>
                    <img
                        className={styles['profile__img']}
                        src={avatarPlaceholder}
                    />
                    <IconButton>
                        <LogoutIcon />
                    </IconButton>
                </div>
            </div>
        </header>
    );
};

export default Header;
