import { Repository } from 'typeorm';
import { dataSource } from '../../dataSources';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import { type } from 'os';

interface UserDTO {
    id: number;
    name: string;
    email: string;
    password: string;

}
interface UpdateUserDetails {
    name?: string;
    email: string;
};

interface UserFilters {
    id?: number;
    name?: string;
    email?: string;
    registered_date?: Date;
}
export class UserService {
    private readonly userRepository: Repository<User>;

    constructor() {
        this.userRepository = dataSource.getRepository(User);
    }

    async createUser(body: UserDTO): Promise<User> {
        const hashedPassword = await this.hashPassword(body.password);
        const newUser = this.userRepository.create({
            ...body,
            password: hashedPassword,
        });
        return await this.userRepository.insert(newUser).then(() => newUser);
    }
    
    async deleteUser(email: string): Promise<void> {
        const user = await this.userRepository.findOneOrFail({
            where: {
                email: email
            }
        });
        await this.userRepository.remove(user);
    }
    async updateUser(email: string, updatedDetails: UpdateUserDetails): Promise<User> {
        const user = await this.userRepository.findOneOrFail({
            where: {
                email: email
            }
        });

        const updatedUser = await this.userRepository.save({
            ...user,
            ...updatedDetails,
        });

        return updatedUser;
    }
    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

}