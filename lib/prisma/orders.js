import prisma from ".";

export async function getOrders() {
  try {
    const orders = await prisma.orders.findMany();
    return { orders };
  } catch (error) {
    return { error };
  }
}

export async function getOrdersByUserId(id) {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        User: id,
      },
    });
    return { orders };
  } catch (error) {
    return { error };
  }
}

export async function createOrder(order) {
  try {
    const orderFromDB = await prisma.orders.create({ data: order });
    return { order: orderFromDB };
  } catch (error) {
    return { error };
  }
}

export async function updateOrder(id, data) {
  try {
    const updatedOrder = await prisma.orders.update({
      where: {
        id: id,
      },
      data: data,
    });
    return { updatedOrder };
  } catch (error) {
    return error;
  }
}

export async function getOrderById(id) {
  try {
    const order = await prisma.orders.findUnique({ where: { id } });
    return { order };
  } catch (error) {
    return { error };
  }
}

export async function deleteOrder(id) {
  try {
    const order = await prisma.orders.delete({ where: { id } });
    return { order };
  } catch (error) {
    return { error };
  }
}
