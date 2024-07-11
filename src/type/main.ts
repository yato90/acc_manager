export interface Account {
    label: Array<{ text: string }>;
    type: string;
    login: string;
    password: string | null;
}