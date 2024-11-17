"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
  id: string;
  name: string;
  fecha_inicio_contrato: Date;
  fecha_final_contrato: Date;
  activo: boolean;
  nombre_empresa: string;
  correo: string;
  telefono: number;
  id_sucursal_dafault: number; //ESTA MAL ESCRITO EL NOMBRE
};

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      // para buscar en ella

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "fecha_inicio_contrato",
    header: "Inicio de contrato",
  },
  {
    accessorKey: "fecha_final_contrato",
    header: "Final de contrato",
  },
  {
    accessorKey: "activo",
    header: "Activo",
  },
  {
    accessorKey: "nombre_empresa",
    header: "Empresa",
  },
  {
    accessorKey: "correo",
    header: "Correo",
  },
  {
    accessorKey: "telefono",
    header: "Telefono",
  },
  {
    accessorKey: "id_sucursal_dafault",
    header: "Sucursal Default",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  // navigator.clipboard.writeText(user.id)
                  console.log("editar")
                }
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  // navigator.clipboard.writeText(user.id)
                  console.log("sacvtivar")
                }
              >
                Activar
              </DropdownMenuItem>

              <AlertDialogTrigger asChild>
                <DropdownMenuItem>Desactivar</DropdownMenuItem>
              </AlertDialogTrigger>

              <DropdownMenuItem
                onClick={() =>
                  // navigator.clipboard.writeText(user.id)
                  console.log("cambiar plan")
                }
              >
                Cambiar plan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
