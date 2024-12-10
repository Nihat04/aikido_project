import styles from './index.module.css';

import { Modal } from '@mui/material';

import { DropDownMenu } from '../../shared/ui/DropDownMenu';
import { RedGradientButton } from '../../shared/ui';
import { GreyButton } from '../../shared/ui/GreyButton';
import { useEffect, useState } from 'react';
import { addStudent, Group as GroupType } from '@/entities/group';
import { getStudents, Student } from '@/entities/user';
import { DeleteBtn } from '@/shared/ui/DeleteBtn';

const Group = ({ group }: { group: GroupType }) => {
    const [students, setStudents] = useState<Student[]>([]);

    const [addStudentModalOpen, setAddStudentModalOpen] =
        useState<boolean>(false);

    useEffect(() => {
        getStudents().then((res) => setStudents(res));
    }, []);

    return (
        <div>
            <DropDownMenu title={group.name} className={styles['drop-menu']}>
                <div className={styles['group']}>
                    <div className={styles['btns']}>
                        <GreyButton
                            onClick={() => setAddStudentModalOpen(true)}
                        >
                            Добавить ученика
                        </GreyButton>
                        <RedGradientButton>Удалить Группу</RedGradientButton>
                    </div>
                    <div className={styles['list-wrapper']}>
                        <ul className={styles['list']}>
                            {group.sportsmens.map((student, index) => (
                                <li className={styles['item']} key={index}>
                                    <p>{index + 1}</p>
                                    <p>{student.fullName}</p>
                                    <DeleteBtn />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </DropDownMenu>
            <Modal open={addStudentModalOpen}>
                <div className={styles['modal']}>
                    {students.map((student) => (
                        <button
                            key={student.id}
                            onClick={() => addStudent(group.id, [student.id])}
                        >
                            {student.fullName}
                        </button>
                    ))}
                    <button onClick={() => setAddStudentModalOpen(false)}>
                        Закрыть
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Group;
