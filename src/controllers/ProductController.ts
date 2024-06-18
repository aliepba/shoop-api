import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';
import { ProductAttributes } from '../database/models/MtProduct';
import { APIResponse } from '../helpers/FormatResponse';
import { ProductImageService } from '../services/ProductImageService';
import upload from '../config/multerConfig';
import fs from 'fs';
import {ProductFormatter } from '../helpers/Format/ProductFormat';

class ProductController{
  private productService: ProductService
  private imageService: ProductImageService

  constructor(){
    this.productService = new ProductService()
    this.imageService = new ProductImageService()
  }

  list = async (req: Request , res : Response): Promise<void> => {
    let response;
    try{
      const productId = req.query.productId;
      if(productId){
        const product = await this.productService.findProduct(productId)
        response = APIResponse("Success Get Data", 200, 'success', product)
      }else{
        const products: ProductFormatter[] = await this.productService.list(req)
        response = APIResponse("Success Get Data", 200, "success", products)
      }
      res.json(response)
    }catch (error: any) {
      res.status(500).json({
        status : "Failed to login",
        error :  error.message 
      })
    }
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try{
      const productDetail: ProductAttributes = req.body;
      const product = await this.productService.create(productDetail)
      res.status(201).json(product)
    }catch(err){
      res.status(500).json({message: 'error creating product', error: err})
    }
  }

  update = async (req: Request, res: Response): Promise<void> => {
    const id: any = req.params.id
    const productDetail: ProductAttributes = req.body
    try{
      const product = await this.productService.update(productDetail, id)
      const response = APIResponse("Success update data", 200, 'success', product)
      res.json(response)
    }catch(err){
      res.status(500).json({message: 'error creating product', error: err})
    }
  }

  destroy = async (req:Request, res: Response): Promise<void> => {
    const id: any = req.params.id
    try{
      await this.productService.delete(id)
      res.json(APIResponse("Success delete product", 200, 'success', ''))
    }catch(err){
      res.status(500).json({message: 'error creating product', error: err})
    }
  }

  uploadImage = async (req:Request, res: Response): Promise<void> => {
        
    upload.single('image')(req, res, async(err) => {
      if(err){return res.status(500).send({message: "File upload failed", error: err.message}); return}
      if(!req.file){return res.status(400).send({message:"No file upload"}); return}

      const imageInput = { 
        ...req.body,
        file: `/uploads/${req.file.filename}`
      }

      try{
        const newImage = await this.imageService.create(imageInput)
        res.json(APIResponse("Successfully upload image", 201, 'success', newImage))
        return
      }catch(error){
          fs.unlink(req.file.path, (err) => {
          if (err) {console.error("Failed to delete the file:", err);}});
        return res.json(APIResponse("Error upload image", 500, 'failed', error))
      }
    })
    return Promise.resolve();
  }

  
}

export default ProductController