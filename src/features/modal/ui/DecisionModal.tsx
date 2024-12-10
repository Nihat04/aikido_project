import styles from '../styles/index.module.css';

import classNames from 'classnames';

import { decisionModal } from '../model/types';
import { Modal } from '@mui/material';

export const DecisionModal = ({ children, btns }: decisionModal) => {
    return (
        <Modal open={true}>
            <>
                <div className={styles['information']}>{children}</div>
                <div className={styles['btns']}>
                    {btns.map((btn, index) => (
                        <button
                            className={classNames(styles['btn'], 'btn-da')}
                            key={index}
                            onClick={() => btn.action()}
                        >
                            {btn.text}
                        </button>
                    ))}
                </div>
            </>
        </Modal>
    );
};
