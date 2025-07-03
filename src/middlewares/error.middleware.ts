import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  try{
    console.error(err.stack);
  res.status(err.statusCode || 500).json({ message: err.message, error: err.name });
  } catch(error){
    next(error)
  }
}