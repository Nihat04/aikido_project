export interface User {
    id: string;
    role: 'coach' | 'student';
    fullName?: string;
}
