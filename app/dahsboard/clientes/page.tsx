"use client";

import { Layout } from "@/components/Layout";
import { Users, columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/app/services/api/graphql/queries";
import { User } from "@/app/services/api/types/user";

export default function Clientes() {
  // Estado para manejar los datos, la carga y los errores
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const users: Users[] = data.users;
  console.log(users);
  return (
    <Layout>
      <DataTable columns={columns} data={users} />
    </Layout>
  );
}
