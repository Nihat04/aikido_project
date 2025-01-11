import { getAttendances } from '@/entities/lesson';
import { Checkbox, CheckboxProps } from '@mui/material';
import { useEffect, useState } from 'react';

type StudentsListInputProps = {
    checkBoxProps?: CheckboxProps;
    studentId: string;
    date: string;
    func: (studentId: string, state: boolean) => void;
};

export const CheckBoxSpecial: React.FC<StudentsListInputProps> = ({
    studentId,
    func,
    date,
}) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        getAttendances(studentId).then((res) => {
            for (const attendance of res) {
                if (attendance.date === date && attendance.isPresent) {
                    setChecked(true);
                }
            }
        });
    }, []);

    return (
        <Checkbox
            value={studentId}
            checked={checked}
            onChange={(e) => (
                setChecked(!checked), func(studentId, e.target.checked)
            )}
        />
    );
};
