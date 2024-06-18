import MtProduct from "../database/models/MtProduct";
import { AuthReq } from "../config/auth";
import TxOrder, { OrderAttributes } from "../database/models/TxOrder";
// import { Request } from "express";
import * as yup from 'yup'
import { Identifier } from "sequelize";
import TxOrderDetail from "../database/models/TxOrderDetail";

const createSchema = yup.object().shape({
  address: yup.string().required('Address is required'),
  payment: yup.string().required('Payment information is required'),
  shippingPrice: yup.number().required('Shipping price is required').min(0, 'Shipping price must be a positive number'),
  status: yup.string().required('Status is required'),
  detail: yup.array().of(
    yup.object().shape({
      productId: yup.number().required('Product ID is required'),
      quantity: yup.number().required('Quantity is required')
    })
  ).required('Detail is required')
});


export class OrderService{

  jwtCode: any;

  constructor(){
    this.jwtCode = process.env.JWT_ENCODE;
  }

  async list(req:AuthReq): Promise<OrderAttributes[]>{
    const datas = await TxOrder.findAll({
                    include: [{model: TxOrderDetail, as : 'detail'}]
                  });
    const jsonResult = datas.map((item) => item.toJSON()) as OrderAttributes[]
    return jsonResult
  }

  async create(request: AuthReq): Promise<void>{
    const orderInput = request.body
    const detailInput =request.body.detail
    await createSchema.validate(request.body, { abortEarly: false });
    const user = request.user
    let totalPrice = 0;

    const order = await TxOrder.create({
     ...orderInput,
     userId: user?.id,
     totalPrice: totalPrice,
     grandTotal: 0
    })

    detailInput.forEach(async (e: {
      quantity: number; 
      productId: Identifier | undefined; 
      }) => {
        const product = await MtProduct.findByPk(e.productId)
        if(product){
          const totalDetailPrice = e.quantity * product.dataValues.price;
          totalPrice =  Math.round(totalPrice + totalDetailPrice)
          await TxOrderDetail.create({
            ...detailInput,
            userId: user?.id,
            orderId: order.dataValues.id,
            productId: e.productId,
            price: product.dataValues.price,
            quantity: e.quantity,
            totalPrice: totalDetailPrice
            })
        }
    });

    const newOrder =  await TxOrder.findByPk(order.dataValues.id)

    if(newOrder){
      const shippingPrice = Number(newOrder.dataValues.shippingPrice) || 0
      newOrder.update({
        totalPrice: totalPrice,
        grandTotal: Math.round(totalPrice + shippingPrice)
      })
    }
  }

  async delete(request: AuthReq, orderId: number): Promise<void>{

    TxOrder.destroy({
      where: {id : orderId}
    })
  
    TxOrderDetail.destroy({
      where: {orderId : orderId}
    })
  }
  
  async updatePayment(req: AuthReq): Promise<OrderAttributes>{
    const orderId = req.body.orderId
    const status = req.body.status
    const order = await TxOrder.findByPk(orderId)

    if (order && order.dataValues) {
      order.update({
        status: status
      })
    }
    
    return order?.toJSON() as OrderAttributes
  }
}