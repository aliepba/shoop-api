import { Request, Response } from 'express';
import { CategoryService } from '../services/CategoryService';
import { ProductCategoryAttributes } from '../database/models/MtProductCategory';
import { APIResponse } from '../helpers/FormatResponse';

class CategoryController{
  private categoryService: CategoryService

  constructor(){
    this.categoryService = new CategoryService
  }

  list = async (req: Request , res : Response): Promise<void> => {
    let response;
    try{
      const categoryId: any = req.query.categoryId;
      if(categoryId){
        const category = await this.categoryService.findCategory(categoryId)
        response = APIResponse("Success Get Data", 200, 'success', category)
      }else{
        const categories = await this.categoryService.list(req)
        response = APIResponse("Success Get Data", 200, 'success', categories)
      }
      res.json(response)
    }catch (error: any) {
      res.status(500).json({
        status : "Failed to login",
        error :  error.message 
      })
    }
  }

  create = async (req: Request , res: Response): Promise<void> => {
    try{
      const categoryInput: ProductCategoryAttributes = req.body
      const category = await this.categoryService.create(categoryInput)
      res.json(APIResponse("Success create data", 201, "success", category))
    }catch(err){
      res.json(APIResponse("Error create data", 403, "error", err))
    }
  }

  update = async (req: Request, res: Response): Promise<void> => {
    const id: any = req.params.id
    const categoryInput: ProductCategoryAttributes = req.body
    try{
      const category = await this.categoryService.update(categoryInput, id)
      res.json(APIResponse("Success update dat", 200, 'success', category))
    }catch(err){  
      res.json(APIResponse("Error create data", 403, "error", err))
    }
  }

  destroy = async(req: Request, res: Response): Promise<void> => {
    const id: any = req.params.id
    try{
      await this.categoryService.delete(id)
      res.json(APIResponse("Success delete category", 200, 'success', ''))
    }catch(err){
      res.json(APIResponse("Error create data", 403, "error", err))
    }
  }

}

export default CategoryController