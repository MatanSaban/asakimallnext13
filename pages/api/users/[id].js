import {
  deleteUser,
  getUserById,
  getUserByMail,
  updateUser,
} from "@/lib/prisma/users";

const handler = async (req, res) => {
  if (req.method === "GET" || req.method === "POST") {
    try {
      const id = req.query.id;
      const { pass } = req.body;
      const { user, error } = await getUserById(id);
      if (error) {
        const { user, error } = await getUserByMail(id, pass);
        if (error) {
          throw new Error(error);
        }
        return res.status(200).json(user.id);
      }
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const data = req.body;
      const id = req.query.id;
      const { updatedUser, error } = await updateUser(id, data);
      if (error) throw new Error(error);
      return res.status(200).json({ data: 'SUCCESS', sellerId: updatedUser.sellerId });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const id = req.query.id;
      const { error } = await deleteUser(id);
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
