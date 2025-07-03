import { Response } from "express";
import jwt from 'jsonwebtoken'
import { AuthRequest } from "../interfaces/auth/interface.auth";
import { JWT_SECRET } from '../config/env'
import { UserController } from "../controllers/user/user.controller";
import { UserService } from "../services/UserService";
import { NextFunction } from "express";
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

const userController = new UserController( new UserService());


interface JwtPayload {
    userId: string;
    iat?: number;
    exp?: number;
    [key: string]: any;
}

export const authentication = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        let token: string | undefined;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
         token = req.headers.authorization.split(' ')[1];
        }

        if(!token) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const decoded = jwt.verify(token , JWT_SECRET as string) as JwtPayload;

        const user = await userController.getById(decoded.userId);
        

        if(!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        req.user = user

        next();
    } catch (error: any) {
       if (error instanceof TokenExpiredError) {
        res.status(401).json({ message: 'Token expired' });
    } else if (error instanceof JsonWebTokenError) {
        res.status(401).json({ message: 'Invalid token' });
    } else {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
    return;
    }
}

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    if (req?.user && req.user.role === 'admin'){
        next()
    } else {
    res.status(401).json({ message: 'You are not allowed to acces this route' });

    }
}

export const isBusiness = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    if (req?.user && req.user.accountType === 'business'){
        next()
    } else {
    res.status(401).json({ message: 'You are not allowed to acces this route' });

    }
}

export const isOwner = async (req: AuthRequest, res: Response,  next: NextFunction): Promise<void> => {
    if (req?.user && req.user.id && req.user.id.toString() === req.params.id.toString()) {
        next();
    } else {
        res.status(403).json({ message: 'You are not the owner of this resource' });
    }
}