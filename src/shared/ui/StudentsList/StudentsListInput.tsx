import styles from './StudentsList.module.css';

import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

import { Student } from '@/entities/user';
import { DeleteBtn } from '../DeleteBtn';

type StudentsListInputProps = {
    checkBoxProps?: CheckboxProps;
    list: Student[];
};

export const StudentsListInput: React.FC<StudentsListInputProps> = ({
    checkBoxProps,
    list,
}) => {
    return (
        <div className={styles['list-wrapper']}>
            <ul className={styles['list']}>
                {list.map((student, index) => (
                    <li className={styles['item']} key={index}>
                        <Checkbox {...checkBoxProps} value={student.id} />
                        <p>{student.fullName}</p>
                        <DeleteBtn />
                    </li>
                ))}
            </ul>
        </div>
    );
};
