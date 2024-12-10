import { Student } from '@/entities/user';

export type Group = {
    id: string;
    name: string;
    sportsmens: Student[];
};
