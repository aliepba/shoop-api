import TxOrder, { OrderAttributes } from "../database/models/TxOrder";
import { AuthReq } from "../config/auth";
import TxOrderDetail from "../database/models/TxOrderDetail";


export class ReportService{
  
  async listTransaction(req:AuthReq): Promise<OrderAttributes[]>{
    const datas = await TxOrder.findAll({
      where : {userId : req.user?.id},
      include: [{model: TxOrderDetail, as : 'detail'}]
    })

    const jsonResult = datas.map((item) => item.toJSON()) as OrderAttributes[]
    return jsonResult
  }

}