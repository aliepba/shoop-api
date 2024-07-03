import TxOrder, { OrderAttributes } from "../database/models/TxOrder";
import { AuthReq } from "../config/auth";
import TxOrderDetail from "../database/models/TxOrderDetail";
import MtProduct from "../database/models/MtProduct";
import { FormatTransactions } from "../helpers/Format/TransactionFormat";


export class ReportService{
  
  async listTransaction(req:AuthReq): Promise<OrderAttributes[]>{
    const datas = await TxOrder.findAll({
      where : {userId : req.user?.id},
      include: [{model: TxOrderDetail, as : 'details', include: [{model: MtProduct, as: 'product'}]}]
    })

    const jsonResult = datas.map((item) => item.toJSON()) as OrderAttributes[]
    const formattedData = FormatTransactions(jsonResult)
    return formattedData 
  }

}