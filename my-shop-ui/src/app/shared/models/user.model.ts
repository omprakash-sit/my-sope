export interface LoggedUser {
    email: string;
    id: number;
    name: string;
    userId: number | string;
    status: string;
    role: string;
    phoneCode?: string;
    alternateNumber?: number;
}