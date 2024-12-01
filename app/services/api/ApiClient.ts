import { client } from "./lib/apollo-client";
import { CREATE_USER, GET_USERS, UPDATE_USER_ACTIVE } from "./graphql/queries";
import { User } from "./types/user";

export const fetchUsuarios = async (): Promise<User[]> => {
  try {
    const { data } = await client.query({
      query: GET_USERS,
    });
    return data.users;
  } catch (error) {
    console.error("Error fetching usuarios:", error);
    throw error;
  }
};

export const updateUserActive = async (
  id: string,
  activo: boolean,
): Promise<User> => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_USER_ACTIVE,
      variables: { id, activo },
      refetchQueries: [{ query: GET_USERS }],
    });
    return data.updateUser;
  } catch (error) {
    console.error("Error updating user active status:", error);
    throw error;
  }
};

export const createUser = async (
  id: string,
  nombre: string,
  telefono: string,
  correo: string,
  nombreEmpresa: string,
): Promise<User> => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_USER,
      variables: { id, nombre, telefono, correo, nombreEmpresa },
      refetchQueries: [{ query: CREATE_USER }],
    });
    return data.createUser;
  } catch (error) {
    console.error("Error to creating user statatus: ", error);
    throw error;
  }
};
