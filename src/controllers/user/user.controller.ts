import { Request, Response, NextFunction } from "express";
import { UserService } from "../../services/UserService";
import { IUser } from "../../interfaces/interface.user";
import { User } from "../../models/User.model";

export class UserController {

    constructor(private userService: UserService) {}

    async createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const userData: IUser = req.body;
            const newUser = await this.userService.createUser(userData);
            return res.status(201).json(newUser);
        } catch (error) {
            return next(error);
        }
    }
    async getById( id: string): Promise<User | null> {
        try {
            const user = await this.userService.findUserById(id);
            if (!user) {
                return null
            }
            return user
        } catch (error) {
             console.error(`Error fetching user with ID ${id}:`, error); // Log for debugging
        return null; 
        }
        
    }

     async getUserById(req: Request, res: Response, next: NextFunction): Promise<Response | null> {
        const {id} = req.params

        try {
       

            const user = await this.userService.findUserById(id);
            if (!user) {
                return null
            }
            return res.status(200).json(user);

        } catch (error) {
             console.error(`Error fetching user with ID ${id}:`, error); // Log for debugging
        return null; 
        }
        
    }

    async getUserByEmail(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { email } = req.params;
            const user = await this.userService.findUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(user);
        } catch (error) {
            return next(error);
        }
    }
    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const users = await this.userService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            return next(error);
        }
    }
    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;
            const user = await this.userService.findUserByEmail(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            await this.userService.deleteUser(id);
            return res.status(204).send();
        } catch (error) {
            return next(error);
        }
    }
}