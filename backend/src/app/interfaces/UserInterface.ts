export interface UserInterface {
    name: string;
    email: string;

    id?: number;
    password?: string;
    password_hash?: string;
    created_at?: Date;
    update_at?: Date;
}
