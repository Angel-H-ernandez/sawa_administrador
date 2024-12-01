import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      nombre
      nombreEmpresa
      fechaInscripcion
      fechaInicioContrato
      fechaFinalContrato
      activo
      telefono
      idPlanServicio
      nombreEmpresa
      correo
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $user: UserInput!) {
    updateUser(id: $id, user: $user) {
      id
      name
      nombreEmpresa
      fechaDeIncripcion
      fechaInicioContrato
      fechaFinalContrato
      activo
      telefono
      idPlanServicio
      nombreEmpresa
      correo
      idSucursalDafault
    }
  }
`;

export const UPDATE_USER_ACTIVE = gql`
  mutation UpdateUserActive($id: ID!, $activo: Boolean!) {
    updateUser(id: $id, activo: $activo) {
      user {
        id
        activo
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUserMutation(
    $id: ID!
    $nombre: string
    $telefono: string
    $correo: string
    $nombreEmpresa: string
  ) {
    createUser(
      id: $id
      nombre: $nombre
      telefono: $telefono
      correo: $correo
      nombreEmpresa: $nombreEmpresa
    ) {
      user {
        id
        nombre
        telefono
        correo
        nombreEmpresa
      }
    }
  }
`;
