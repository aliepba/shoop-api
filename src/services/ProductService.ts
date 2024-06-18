import MtProduct, { ProductAttributes } from "../database/models/MtProduct"
import MtProductCategory from "../database/models/MtProductCategory";
import * as yup from 'yup'
import { AuthReq } from "config/auth";
import MtProductGallery from "../database/models/MtProductGallery";
import { FormatAll, FormatProduct, ProductFormatter } from "../helpers/Format/ProductFormat";

const createSchema = yup.object().shape({
  name : yup.string().required(),
  price : yup.number().required(),
  description: yup.string().required(),
  tags : yup.string().required(),
  categoryId :yup.number().required()
})

export class ProductService{

  jwtCode: any;

  constructor(){
    this.jwtCode = process.env.JWT_ENCODE;
  }

  async list(req: AuthReq): Promise<ProductFormatter[]>{
    const datas = await MtProduct.findAll({include: 
      [{model: MtProductCategory, as :'category'},
        {model: MtProductGallery, as : 'galleries'}
      ]})
    const jsonResult = datas.map((item) => item.toJSON()) as ProductAttributes[]
    const formattedData = FormatAll(jsonResult as unknown as ProductAttributes[])
    return formattedData
  } 

  async create(productDetail: ProductAttributes): Promise<ProductAttributes>{
    await createSchema.validate(productDetail)

    const product = await MtProduct.create({
      ...productDetail,
    })

    return product.toJSON() as ProductAttributes
  }

  async findProduct(productId: any) : Promise<ProductFormatter>{
    const data = await MtProduct.findByPk(productId, {include: [{model: MtProductCategory, as :'category'},
      {model: MtProductGallery, as : 'galleries'}
    ]})
    const result =  data?.toJSON() as ProductAttributes
    const formattedData = FormatProduct(result)
    return formattedData

  }
  
  async update(productDetail:ProductAttributes, productId: number): Promise<ProductAttributes>{
    const data = await MtProduct.findByPk(productId)
    if (data && data.dataValues) {
      data.update({
        categoryId: productDetail.categoryId,
        name: productDetail.name,
        price: productDetail.price,
        description: productDetail.description,
        tags: productDetail.tags
      });
    }

    return data?.toJSON() as ProductAttributes
  }

  async delete(productId: number): Promise<void>{
    const data = await MtProduct.findByPk(productId)
    await data?.destroy()
  }
}