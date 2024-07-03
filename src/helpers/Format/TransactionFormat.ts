import { OrderAttributes } from "..../../database/models/TxOrder";

export interface TransactionFormatter{
  id: number,
  address: string,
  payment: string,
  totalPrice: number,
  shippingPrice: number,
  grandTotal: number,
  status: string,
  details?: DetailTransactionFormatter[],
  createdAt: any,
}

export interface DetailTransactionFormatter{
  id: number,
  userId: number,
  productId: number,
  orderId: number,
  name: string,
  price: number,
  quantity: number,
  totalPrice: number
}

export function FormatTransaction(transaction: OrderAttributes) : TransactionFormatter{
  const format: TransactionFormatter = {
    id: transaction.id,
    address: transaction.address,
    totalPrice: transaction.totalPrice,
    shippingPrice: transaction.shippingPrice,
    grandTotal: transaction.grandTotal,
    status: transaction.status,
    payment: transaction.payment,
    details: transaction.details ? transaction.details.map((trx: any)=> ({
      id: trx.id,
      userId: trx.userId,
      productId: trx.productId,
      orderId: trx.orderId,
      name: trx.product.name,
      price : trx.product.price,
      quantity: trx.quantity,
      totalPrice: trx.totalPrice
    })) : [],
    createdAt: transaction.createdAt
  }

  return format
}

export function FormatTransactions(transactions: OrderAttributes[]): TransactionFormatter[]{
  const format: TransactionFormatter[] = [];
  
  for(const item of transactions){
    const trxFormatter = FormatTransaction(item)
    format.push(trxFormatter)
  }

  return format;
}