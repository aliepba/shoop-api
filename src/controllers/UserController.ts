import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import {UserAttributes} from '../database/models/MtUser';
import { APIResponse } from '../helpers/FormatResponse';

class UserController{
  private userService: UserService;

  constructor(){
    this.userService = new UserService()
  }

  public login = async (req:Request, res:Response): Promise<void> => {
    const {email, password} = req.body
    try {
      const {user} = await this.userService.login(email, password);
      const response = APIResponse("Success login", 200, "success", user) 
      res.status(200).json(response)
  } catch (error: any) {
      res.status(500).json({
          status : "Failed to login",
          error :  error.message 
      })
  }
  }

  public list = async (req: Request, res: Response): Promise<void> => {
    try{
      const users: UserAttributes[] = await this.userService.list()
      const response = APIResponse("Success Get Data", 200, "success", users)
      res.json(response)
    }catch(err){
      res.status(500).json({message: 'error retrieving users', error: err})
    }
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try{
      const userDetail: UserAttributes = req.body;
      const user = await this.userService.create(userDetail)
      res.status(201).json(user)
    }catch(err){
      res.status(500).json({message: 'error retrieving users', error: err})
    }
  }

  public findBy = async(req: Request, res: Response): Promise<void> => {
    try{
      const data = await this.userService.findByUser(req)
      const response = APIResponse("Get Data Success", 200, "success", data)  
      res.json(response)
    }catch(err){
      res.status(500).json({message: 'error retrieving users', error: err})
    }
  }
}

export default UserController