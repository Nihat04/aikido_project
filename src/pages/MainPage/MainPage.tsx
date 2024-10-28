import styles from './styles/index.module.css';

import Header from '../../widgets/Header/Header';

const MainPage = () => {
    return (
        <>
            <Header />
            <main className={styles['main']}>
                <section className={styles['welcome']}>
                    <div className={styles['welcome__bg']}></div>
                    <p className={styles['welcome__text']}>
                        Добро{' '}
                        <span className={styles['welcome__text--red']}>
                            пожаловать
                        </span>
                    </p>
                </section>
            </main>
        </>
    );
};

export default MainPage;
