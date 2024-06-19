import { Request, Response } from 'express';
import { APIResponse } from '../helpers/FormatResponse';
import { ReportService } from '../services/ReportService';

class ReportController{
  private reportService: ReportService

  constructor(){
    this.reportService = new ReportService()
  }

  historyTransaction = async (req: Request, res : Response): Promise<void> => {
    try{
      const data = await this.reportService.listTransaction(req)
      const response = APIResponse("Success Get Data", 200, 'success', data)
      res.json(response)
    }catch (error: any) {
      res.status(500).json({
        status : "Failed to login",
        error :  error.message 
      })
    }
  }
}

export default ReportController