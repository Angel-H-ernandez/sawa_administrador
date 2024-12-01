"use client";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { updateUserActive } from "../../services/api/ApiClient"; // Adjust path as needed
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
import { useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
  id: string;
  nombre: string;
  fecha_inscripcion: Date;
  fecha_inicio_contrato: Date;
  fecha_final_contrato: Date;
  activo: boolean;
  id_plan_servicio: number;
  nombre_empresa: string;
  correo: string;
  telefono: number;
};

// Componente para el diálogo de edición
const EditDialog = ({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: Users;
}) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar Usuario</AlertDialogTitle>
          <AlertDialogDescription>
            Edita la información del usuario {user.nombre}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* Aquí puedes agregar tus campos de formulario */}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onClose}>Guardar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Componente para el diálogo de cambio de plan
const ChangePlanDialog = ({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: Users;
}) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cambiar Plan</AlertDialogTitle>
          <AlertDialogDescription>
            Selecciona el nuevo plan para {user.nombre}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* Aquí puedes agregar el selector de planes */}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onClose}>Cambiar Plan</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export function AlertDestructive() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  );
}

/*async function activarUsuario(idUser: string) {
  try {
    await updateUserActive(idUser, true);
    setActiveDialog(null);
    toast({
      title: "Usuario Activado",
      description: "El usuario ha sido activado exitosamente",
      variant: "default",
    });
  } catch (error) {
    console.error("Error al activar usuario:", error);
    toast({
      title: "Error",
      description: "No se pudo activar el usuario",
      variant: "destructive",
    });
    // Optional: Add error notification
  }
}*/

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => {
      // para buscar en ella

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "fechaInscripcion",
    header: "fecha inscrito",
  },
  {
    accessorKey: "fechaInicioContrato",
    header: "Inicio de contrato",
  },
  {
    accessorKey: "fechaFinalContrato",
    header: "Final de contrato",
  },
  {
    accessorKey: "activo",
    header: "Activo",
  },
  {
    accessorKey: "nombreEmpresa",
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
    accessorKey: "idPlanServicio",
    header: "Plan",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const [activeDialog, setActiveDialog] = useState<
        "edit" | "activate" | "deactivate" | "changePlan" | null
      >(null);
      const { toast } = useToast();

      const cambiarEstadoUsuario = async (
        idUser: string,
        activo: boolean,
        title: string,
        description: string,
      ) => {
        try {
          await updateUserActive(idUser, activo);
          setActiveDialog(null);
          toast({
            title: title,
            description: description,
            variant: "success",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Ha ocurrido un error en la operacion",
            variant: "destructive",
          });
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setActiveDialog("edit")}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveDialog("activate")}>
                Activar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveDialog("deactivate")}>
                Desactivar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveDialog("changePlan")}>
                Cambiar plan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Diálogo de Edición */}
          <EditDialog
            isOpen={activeDialog === "edit"}
            onClose={() => setActiveDialog(null)}
            user={user}
          />

          {/* Diálogo de Activación */}
          <AlertDialog open={activeDialog === "activate"}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Deseas activar este usuario?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esto permitirá que el usuario acceda nuevamente al punto de
                  venta
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setActiveDialog(null)}>
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    cambiarEstadoUsuario(
                      user.id,
                      true,
                      "Usuario Activado",
                      "El usuario ahora podra acceder al punto de venta nuevamente",
                    )
                  }
                >
                  Activar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Diálogo de Desactivación */}
          <AlertDialog open={activeDialog === "deactivate"}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Deseas desactivar este usuario?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esto bloqueará el acceso del usuario al punto de venta, puede
                  revertir la acción activando al usuario nuevamente
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setActiveDialog(null)}>
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    cambiarEstadoUsuario(
                      user.id,
                      false,
                      "Usuario Desactivado",
                      "El usuario ahora no podra acceder al punto de venta",
                    )
                  }
                >
                  Desactivar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Diálogo de Cambio de Plan */}
          <ChangePlanDialog
            isOpen={activeDialog === "changePlan"}
            onClose={() => setActiveDialog(null)}
            user={user}
          />
        </>
      );
    },
  },
];
