import prisma from ".";

export async function getUsers() {
  try {
    const users = await prisma.users.findMany();
    return { users };
  } catch (error) {
    return { error };
  }
}

export async function createUser(user) {
  try {
    const userFromDB = await prisma.users.create({ data: user });
    return { user: userFromDB };
  } catch (error) {
    return { error };
  }
}

export async function getUserById(id) {
  try {
    const user = await prisma.users.findUnique({ where: { id } });
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function updateUser(id, data) {
  try {
    const updatedUser = await prisma.users.update({
      where: {
        id: id,
      },
      data: data,
    });
    console.log(updatedUser);
    return { updatedUser };
  } catch (error) {
    return error;
  }
}

export async function deleteUser(id) {
  try {
    const user = await prisma.users.delete({ where: { id } });
    return { user };
  } catch (error) {
    return { error };
  }
}
