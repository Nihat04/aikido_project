import styles from './StudentsList.module.css';

import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

import { Student } from '@/entities/user';
import { DeleteBtn } from '../DeleteBtn';

type StudentsListInputProps = {
    checkBoxProps?: CheckboxProps;
    list: Student[];
    width?: string;
    checkedBoxes?: string[];
};

export const StudentsListInput: React.FC<StudentsListInputProps> = ({
    checkBoxProps,
    list,
    width = '',
    checkedBoxes = [],
}) => {
    const isChecked = (studentId: string) => {
        const bool = checkedBoxes.includes(studentId);
        return bool;
    };

    return (
        <div
            style={{ width: width }}
            className={!width ? styles['list-wrapper'] : ''}
        >
            <ul className={styles['list']}>
                {list.map((student, index) => (
                    <li className={styles['item']} key={index}>
                        <Checkbox
                            {...checkBoxProps}
                            value={student.id}
                            defaultChecked={isChecked(student.id)}
                        />
                        <p>{student.fullName}</p>
                        <DeleteBtn />
                    </li>
                ))}
            </ul>
        </div>
    );
};
