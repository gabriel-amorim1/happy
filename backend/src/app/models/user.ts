import { getRepository } from 'typeorm';
import User from '../../database/entities/User';
import { UserInterface } from '../interfaces/UserInterface';

export const create = async (
    userObject: UserInterface,
): Promise<UserInterface> => {
    const userEntity = Object.assign(new User(), userObject);

    return getRepository(User).save(userEntity);
};

export const getByEmail = async (email: string): Promise<User | undefined> => {
    return getRepository(User).findOne({ where: { email } });
};
