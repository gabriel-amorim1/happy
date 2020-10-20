import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { UserInterface } from '../interfaces/UserInterface';

export default {
    render(user: UserInterface): SessionResponseInterface {
        return {
            user: {
                id: user.id!,
                name: user.name,
                email: user.email,
            },
            token: jwt.sign({ id: user.id }, authConfig.secret!, {
                expiresIn: authConfig.expiresIn,
            }),
        };
    },
};
