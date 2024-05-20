import express from 'express';
import userController from '../controller/user.controller.js';
const route = express.Router();
import {validId, validUser} from "../middlewares/global.middlewares.js";

route.post('/', userController.create);
route.get('/',userController.findAll);
route.get('/:id', validId, validUser ,userController.findById);
route.patch("/:id", validId, validUser ,userController.update);
route.delete('/:id', userController.deleteUserById);


export default route;