import express , {Request, Response} from 'express';
import { IMenuItem } from '../../interfaces/menuItems-interface';

const validateItem = (req : IMenuItem.IItemRequest,res : Response, next :express.NextFunction)=>{
    
  if (!req.body.name || !req.body.category) {
    return res.status(401).send("name and category are required !").end();
  }
  
  if (req.body.price && typeof req.body.price !== 'number') {
    return res.status(401).send("price should be number !").end();
  }

  next();

}

export default validateItem ;