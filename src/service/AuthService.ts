// bookService.ts
import { Repository } from 'typeorm';
import { dataSource } from '../../dataSources';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

interface LoginBody {
    email: string,
    password: string,

}

export class AuthService {
    private readonly userRepository: Repository<User>;

    constructor() {
        this.userRepository = dataSource.getRepository(User);
    }


    async getToken(req: LoginBody): Promise<string> {
        const { email, password } = req
        const user = await this.userRepository.findOneOrFail({
            where: {
                email: email
            }
        });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Invalid email or password');
        }


        const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h', algorithm: 'HS256' }); //key should be in a .env file
        return token
    };
}