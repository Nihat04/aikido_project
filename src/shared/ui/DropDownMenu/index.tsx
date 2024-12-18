import { useState } from 'react';
import styles from './index.module.css';
import classNames from 'classnames';

type DropdownMenuProps = {
    children: JSX.Element;
    title: string;
    time?: string;
    className?: string;
};

export const DropDownMenu: React.FC<DropdownMenuProps> = ({
    children,
    title,
    time = null,
    className = '',
}) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={className}>
            <div className={styles['preview']} onClick={() => setOpen(!open)}>
                {time && <p className={styles['toleft']}>{time}</p>}
                <p>{title}</p>
                {time && <div />}
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
