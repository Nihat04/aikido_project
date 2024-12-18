import styles from '@/shared/ui/StudentsList/StudentsList.module.css';

import Checkbox from '@mui/material/Checkbox';

import { Student } from '@/entities/user';
import { Lesson } from '@/entities/lesson';

type StudentsListProps = {
    list: Student[];
    width?: string;
    checkedBoxes?: string[];
    lesson: Lesson;
    clickAction: (studentId: string, date: string, price: number) => void;
};

export const StudentsList: React.FC<StudentsListProps> = ({
    list,
    width = '',
    checkedBoxes = [],
    clickAction,
    lesson,
}) => {
    return (
        <div
            style={{ width: width }}
            className={!width ? styles['list-wrapper'] : ''}
        >
            <ul className={styles['list']}>
                {list.map((student, index) => (
                    <li className={styles['item']} key={index}>
                        <p>{student.fullName}</p>
                        <Checkbox
                            value={student.id}
                            onChange={() =>
                                clickAction(
                                    student.id,
                                    lesson.date,
                                    lesson.price
                                )
                            }
                            defaultChecked={checkedBoxes.includes(student.id)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
