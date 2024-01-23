import express from 'express';
import { UserController } from '../controller/UserController';
// import { validateQueryParams } from '../../middlewares/validateQueryParams'
const userController = new UserController();
const router = express.Router();


router.post('/add', userController.createUser.bind(userController));
router.put('/:email', userController.updateUser.bind(userController));
router.delete('/:email', userController.deleteUser.bind(userController));
router.get('/:email', userController.getUser.bind(userController))

export default router;
