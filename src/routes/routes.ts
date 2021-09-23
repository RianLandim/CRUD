import { Request, Response, Router } from "express";
import UserController from "../controllers/UserController";

const routes = Router();

routes.get('/', (req : Request, res: Response) => {
    res.json("API CRUD")
})

routes.get('/users', UserController.read)
routes.post('/store', UserController.create)
routes.put('/update/:id', UserController.update)
routes.delete('/delete/:id', UserController.delete)

export default routes; 