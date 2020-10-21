import { HttpError } from '../errors/HttpError';
import { UserInterface } from '../interfaces/UserInterface';
import * as repository from '../models/user';
import * as userView from '../views/users_view';

export const create = async (data: UserInterface): Promise<UserInterface> => {
    if (await repository.getByEmail(data.email))
        throw new HttpError(400, 'Email already exists');

    const user = await repository.create(data);

    return userView.render(user);
};
