import { Xendit, Invoice as InvoiceClient } from "xendit-node";
class TransactionController {
  static async transactionXendit(req, res, next) {
    try {
      const xenditClient = new Xendit({ secretKey: YOUR_SECRET_KEY });
      const { Invoice } = xenditClient;

      const xenditInvoiceClient = new InvoiceClient({
        secretKey: YOUR_SECRET_KEY,
      });

      // At this point, `Invoice` and `xenditInvoiceClient` will have no usage difference, for example:
      // Invoice.
      // or
      // xenditInvoiceClient.
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TransactionController;
