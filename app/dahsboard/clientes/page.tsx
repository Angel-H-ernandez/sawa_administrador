"use client";

import { Layout } from "@/components/Layout";
import { Users, columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { fetchUsuarios } from "../../services/ApiClient";

export default function Clientes() {
  // Estado para manejar los datos, la carga y los errores
  const [usuarios, setUsuarios] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect para hacer la petición a la API cuando el componente se monta
  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const data = await fetchUsuarios(); // Llamada a la API
        console.log(data);
        setUsuarios(data.users); // Actualiza el estado con los usuarios obtenidos
        setLoading(false); // Cambia el estado de carga a false
      } catch (error) {
        setError("Error al cargar los usuarios"); // En caso de error
        setLoading(false); // Cambia el estado de carga a false
      }
    };

    getUsuarios();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Si los datos están cargando
  if (loading) return <p>Cargando...</p>;

  // Si hay un error
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <DataTable columns={columns} data={usuarios} />
    </Layout>
  );
}
