import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Middleware logic can be added here
    console.log("SimpleMiddleware is called");

    const authorization = req.headers?.authorization;

    if(authorization){
      req['user'] = {
        id: 1,
        name: 'Matheus'
      }
   }
    
    // return res.status(404).send({
    //   message: "Não encontrado",
    // });
    next();

    res.on('finish', () => {
      console.log('SimpleMiddleware fim')
    });
    
  }
}