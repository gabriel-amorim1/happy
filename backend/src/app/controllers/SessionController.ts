import User from '../../database/entities/User';
import { HttpError } from '../errors/HttpError';
import * as model from '../models/user';
import * as sessionView from '../views/sessions_view';

export const create = async (
    email: string,
    password: string,
): Promise<SessionResponseInterface> => {
    const user = await model.getByEmail(email);

    if (!user) throw new HttpError(401, 'User not found');

    if (!(await model.checkPassword(user, password)))
        throw new HttpError(401, 'Password does no match');

    return sessionView.render(user);
};
