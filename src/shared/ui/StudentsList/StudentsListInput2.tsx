import styles from './StudentsList.module.css';

import { CheckboxProps } from '@mui/material/Checkbox';

import { Student } from '@/entities/user';
import { DeleteBtn } from '../DeleteBtn';
import { CheckBoxSpecial } from './CheckBoxSpecial';

type StudentsListInputProps = {
    checkBoxProps?: CheckboxProps;
    list: Student[];
    width?: string;
    date: string;
    func: (studentId: string, state: boolean) => void;
};

export const StudentsListInput2: React.FC<StudentsListInputProps> = ({
    list,
    width = '',
    func,
    date,
}) => {
    return (
        <div
            style={{ width: width }}
            className={!width ? styles['list-wrapper'] : ''}
        >
            <ul className={styles['list']}>
                {list.map((student, index) => (
                    <li className={styles['item']} key={index}>
                        <CheckBoxSpecial
                            date={date}
                            func={func}
                            studentId={student.id}
                        />
                        <p>{student.fullName}</p>
                        <DeleteBtn />
                    </li>
                ))}
            </ul>
        </div>
    );
};
