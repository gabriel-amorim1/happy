import { HttpError } from '../errors/HttpError';
import * as repository from '../models/user';
import sessionView from '../views/sessions_view';

export const create = async (
    email: string,
    password: string,
): Promise<SessionResponseInterface> => {
    const user = await repository.getByEmail(email);

    if (!user) throw new HttpError(401, 'User not found');

    if (!(await user.checkPassword(password)))
        throw new HttpError(401, 'Password does no match');

    return sessionView.render(user);
};
