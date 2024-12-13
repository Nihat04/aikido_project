import classNames from 'classnames';
import styles from './ScheduleWindow.module.css';

import React from 'react';

type SheduleWindowProps = {
    eventName?: string;
    onClick?: () => void;
    state: 'empty' | 'filled';
};

export const SheduleWindow: React.FC<SheduleWindowProps> = ({
    eventName,
    onClick,
    state,
}) => {
    return (
        <div
            className={classNames(styles['shedule-window'], {
                [styles['state-empty']]: state === 'empty',
                [styles['state-filles']]: state === 'filled',
            })}
            onClick={onClick}
        >
            {eventName}
        </div>
    );
};
