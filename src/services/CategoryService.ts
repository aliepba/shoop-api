import MtProductCategory, {ProductCategoryAttributes} from '../database/models/MtProductCategory';
import * as yup from 'yup'
import { AuthReq } from "config/auth";

const createSchema = yup.object().shape({
  name : yup.string().required()
})

export class CategoryService{
  jwtCode: any;

  constructor(){
    this.jwtCode = process.env.JWT_ENCODE;
  }

  async list(req: AuthReq): Promise<ProductCategoryAttributes[]>{
    const datas = await MtProductCategory.findAll()
    const jsonResult = datas.map((item)=> item.toJSON()) as ProductCategoryAttributes[]
    return jsonResult
  }

  async create(categoryInput: ProductCategoryAttributes): Promise<ProductCategoryAttributes>{
    await createSchema.validate(categoryInput)
    const category = await MtProductCategory.create({
      ...categoryInput
    })

    return category.toJSON() as ProductCategoryAttributes
  }

  async findCategory(categoryId: number): Promise<ProductCategoryAttributes>{
    const data = await MtProductCategory.findByPk(categoryId)
    return data?.toJSON() as ProductCategoryAttributes
  }

  async update(categoryInput : ProductCategoryAttributes, categoryId: number): Promise<ProductCategoryAttributes>{
    const data = await MtProductCategory.findByPk(categoryId)
    if (data && data.dataValues) {
      data.update({name: categoryInput.name})
    }

    return data?.toJSON() as ProductCategoryAttributes
  }

  async delete(categoryId: number): Promise<void>{
    const data = await MtProductCategory.findByPk(categoryId)
    await data?.destroy()
  }


}


