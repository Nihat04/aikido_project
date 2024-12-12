import { Student } from '@/entities/user';
import styles from './StudentsList.module.css';
import { DeleteBtn } from '../DeleteBtn';

export const StudentsList: React.FC<{ list: Student[] }> = ({ list }) => {
    return (
        <div className={styles['list-wrapper']}>
            <ul className={styles['list']}>
                {list.map((student, index) => (
                    <li className={styles['item']} key={index}>
                        <p>{index + 1}</p>
                        <p>{student.fullName}</p>
                        <DeleteBtn />
                    </li>
                ))}
            </ul>
        </div>
    );
};
