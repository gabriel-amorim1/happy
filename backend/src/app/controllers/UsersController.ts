import * as repository from '../models/user';

import userView from '../views/users_view';

export const create = async (data: UserInterface) => {
    const user = await repository.create(data);

    return userView.render(user);
};
