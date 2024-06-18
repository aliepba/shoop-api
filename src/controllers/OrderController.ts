import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
import { APIResponse } from '../helpers/FormatResponse';

class OrderController{
  private orderService: OrderService

  constructor(){
    this.orderService = new OrderService
  }

  list = async (req: Request, res: Response): Promise<void> => {
    try{
      const datas = await this.orderService.list(req)
      res.json(APIResponse("Success get data", 200, 'success', datas))
    }catch(err){
      res.json(APIResponse("Error create data", 500, "error", err))
    }
  }

  create = async (req: Request, res : Response): Promise<void> => {
    try{
      const order = await this.orderService.create(req)
      res.json(APIResponse("Success create order", 201, "success", order))
    }catch(err){
      res.json(APIResponse("Error create data", 500, "error", err))
    }
  }

  updatePayment = async (req: Request, res: Response): Promise<void> => {
    try{
      const order = await this.orderService.updatePayment(req)
      res.json(APIResponse("Success update payment", 201, 'success', order))
    }catch(err){
      res.json(APIResponse("Error update payment", 500, 'error', err))
    }
  }

  delete = async (req: Request, res: Response):  Promise<void> => {
    const id: any = req.params.id
    console.log(id)
    try{
      await this.orderService.delete(req, id)
      res.json(APIResponse("Success delete order", 200, 'success', ''))
    }catch(err){
      res.json(APIResponse("Error delete order", 500, "error", ''))
    }
  }
}

export default OrderController