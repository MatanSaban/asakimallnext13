import { createSeller, getSellers } from "@/lib/prisma/sellers";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { sellers, error } = await getSellers();
      if (error) throw new Error(error);
      return res.status(200).json({ sellers });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const data = req.body;
      const { seller, error } = await createSeller(data);
      if (error) throw new Error(error);
      return res.status(200).json({ data: seller });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed `);
};

export default handler;
