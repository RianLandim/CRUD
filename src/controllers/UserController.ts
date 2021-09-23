import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import { emailRGX } from '../utils/Regex';

import User from "../app/models/user";

class UserController {

  async read(req: Request, res: Response) {
    const repository = getRepository(User);

    const users = await repository.find();

    return res.json(users);
  };

  async create(req: Request, res: Response) {
    const repository = getRepository(User);

    const { username, email, password } = req.body;

    const emailexists = await repository.findOne({ where: { email } });

    if (!username && !email && !password) return res.json("Fields Empty!")
    if (!username) return res.json("username field empty!");
    if (!email) return res.json("email field empty!");
    if (!password) return res.json("password field empty!");
    if (!emailRGX.test(email)) return res.json("Email invalid!")
    if (emailexists) return res.json("Email already exists!")

    const user = repository.create({
      username,
      email,
      password
    });

    await repository.save(user);

    return res.json(user);
  };

  async update(req: Request, res: Response) {
    const user = await getRepository(User).findOne(req.params.id);

    if (user) {
      if (emailRGX.test(req.body.email)) {
        getRepository(User).merge(user, req.body);
        const result = await getRepository(User).save(user);
        return res.json(result);
      }
      return res.json("Email invalid!")
    }

    return res.json("User not found!")
  };

  async delete(req: Request, res: Response) {
    const repository = getRepository(User);

    const user = repository.delete(req.params.id);

    return res.json(user);

  };
}

export default new UserController;