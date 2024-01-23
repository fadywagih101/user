import { Request, Response } from 'express';
import { UserService } from '../service/UserService';
import Joi from 'joi';
// import { validateBody } from '../../decorators/validateRequestBody'

const createUserBody = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(), // Include password validation here
})
const updateUserBody = Joi.object({
    name: Joi.string().optional,
    email: Joi.string().email().required(),
})
export class UserController {
    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    // @validateBody(createUserBody)
    async createUser(req: Request, res: Response) {
        try {
            const User = await this.userService.createUser(req.body);
            res.status(201).json({
                message: "User created successfully",
                data: User,
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // @validateBody(updateUserBody)
    async updateUser(req: Request, res: Response) {
        try {
            const User = await this.userService.updateUser(req.params.isbn, req.body);
            res.status(200).json({
                message: "User updated successfully",
                data: User,
            });
        } catch (error: any) {
            res.status(404).json({ message: 'Not Found' });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            await this.userService.deleteUser(req.params.isbn);
            res.status(204).json({ message: 'User deleted successfully' });
        } catch (error: any) {
            res.status(404).json({ message: 'Not Found' });
        }
    }

}
