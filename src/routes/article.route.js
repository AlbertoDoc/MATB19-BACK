import articleController from '../controller/article.controller.js';
import express from 'express';
import cors from 'cors';
import { validToken } from '../middlewares/jwt.token.middleware.js';
import { validId } from "../middlewares/global.middlewares.js";
import multer from 'multer';


const app = express();
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.use(cors());

const route = express.Router();
route.get('/all', articleController.getArticles);
route.get('/image/:id', articleController.getImage);
route.patch('/:id', validToken, validId, upload.single('image'),  articleController.updateArticle);
route.delete('/:id', validToken, validId, articleController.deleteArticle);
route.post('/create', validToken, upload.single('image'), articleController.addArticle);


export default route;
