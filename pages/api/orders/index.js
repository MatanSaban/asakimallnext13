import { createOrder, getOrders } from "@/lib/prisma/orders";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { orders, error } = await getOrders();
      if (error) throw new Error(error);
      return res.status(200).json({ orders });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const data = req.body;
      const { order, error } = await createOrder(data);
      if (error) throw new Error(error);
      return res.status(200).json({ data: order });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed `);
};

export default handler;
