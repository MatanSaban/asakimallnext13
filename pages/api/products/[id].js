import {
  getProductById,
  updateProduct,
  deleteProduct,
} from "@/lib/prisma/products";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const id = req.query.id;
      const { product, error } = await getProductById(id);
      if (error) throw new Error(error);
      return res.status(200).json({ product });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const id = req.query.id;
      const data = req.body;
      const { product, error } = await updateProduct(id, data);
      if (error) throw new Error(error);
      return res.status(200).json({ data: product });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const id = req.query.id;
      const { error } = await deleteProduct(id);
      if (error) throw new Error(error);
      return res.status(200).json({ deleted: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed `);
};

export default handler;
