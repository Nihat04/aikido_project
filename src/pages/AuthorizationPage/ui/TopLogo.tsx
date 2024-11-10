import styles from '../styles/index.module.css';

import logo from '../../../shared/assets/img/logo.png';

export const TopLogo = () => {
    return (
        <div className={styles['logo']}>
            <img className={styles['logo__img']} src={logo} alt="" />
            <span className={styles['logo__text']}>Dolma Dojo</span>
        </div>
    );
};
