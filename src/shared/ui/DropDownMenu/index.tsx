import { useState } from 'react';
import styles from './index.module.css';
import classNames from 'classnames';

export const DropDownMenu = ({
    children,
    title,
    className = '',
}: {
    children: JSX.Element;
    title: string;
    className?: string;
}) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={className}>
            <div className={styles['preview']} onClick={() => setOpen(!open)}>
                {title}
            </div>
            <div
                className={classNames(styles['menu'], {
                    [styles['open']]: open,
                })}
            >
                {children}
            </div>
        </div>
    );
};
