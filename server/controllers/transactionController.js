const { Invoice } = require("xendit-node");
const { Room } = require("../models");
class TransactionController {
  static async finishPayment(req, res, next) {
    // console.log(req.body, 5);
  }

  static async invoiceXendit(req, res, next) {
    try {
      const invoiceService = new Invoice({
        secretKey: process.env.SECRET_API_XENDIT,
      });
      const { roomId } = req.params;
      const room = await Room.findByPk(roomId);
      const data = {
        amount: room.price,
        invoiceDuration: 172800,
        externalId: room.externalId,
        description: "Bayar Penginapan",
        currency: "IDR",
        reminderTime: 1,
      };

      const response = await invoiceService.createInvoice({
        data,
      });

      res.status(200).json(response);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}
module.exports = TransactionController;
