import { Xendit } from "xendit-node";

const Transaction = () => {
  const apiXendit = import.meta.env.VITE_SECRET_API_KEY;
  const xenditClient = new Xendit({
    secretKey: apiXendit,
    xenditURL: "https://mock-server.localhost:3000",
  });
  console.log(xenditClient.opts);
  return (
    <>
      <p></p>
    </>
  );
};

export default Transaction;
