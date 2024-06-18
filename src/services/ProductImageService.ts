import MtProductGallery, {ProductGalleryAttributes} from "../database/models/MtProductGallery";
import * as yup from 'yup'
import { AuthReq } from "config/auth";
// import fs from 'fs';

const createSchema = yup.object().shape({
  productId : yup.number().required(),
  file: yup.string().required()
})

export class ProductImageService{

  jwtCode: any;

  constructor(){
    this.jwtCode = process.env.JWT_ENCODE;
  }

  async list(req: AuthReq): Promise<ProductGalleryAttributes[]>{
    const datas = await MtProductGallery.findAll()
    const jsonResult = datas.map((item) => item.toJSON()) as ProductGalleryAttributes[]
    return jsonResult
  }

  async create(imageInput: ProductGalleryAttributes): Promise<ProductGalleryAttributes>{
    await createSchema.validate(imageInput)
    const image = await MtProductGallery.create({
      ...imageInput
    })

    return image.toJSON() as ProductGalleryAttributes
  }

  async update(imageInput: ProductGalleryAttributes, productImageId: number): Promise<ProductGalleryAttributes>{
    const data = await MtProductGallery.findByPk(productImageId)
    if (data && data.dataValues) {
      data.update({
        productId: imageInput.productId,
        file: imageInput.file
      })
    }

    return data?.toJSON() as ProductGalleryAttributes
  }

  async delete(productImageId:number): Promise<void>{
    const data = await MtProductGallery.findByPk(productImageId)
    // const filePath = data?.dataValues.file;
    // if (filePath) {
    //   fs.unlink(filePath, (err) => {
    //     if(err){throw new Error("Error deleting file")}
    //   })
    // }
    await data?.destroy()
  }



}