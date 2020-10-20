interface SessionResponseInterface {
    user: {
        id: number;
        name: string;
        email: string;
    };
    token: string;
}
