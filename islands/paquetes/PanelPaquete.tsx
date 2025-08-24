import { useEffect, useRef, useState } from "preact/hooks";
import { ButtonFilled } from "../../components/ButtonFilled.tsx";
import MaterialIcon from "../MaterialIcon.tsx";
interface ListadoPaquetesProps {
  paquete: PaqueteModel;
}
interface PaqueteModel {
  id: string;
  nombre: string;
  descripcion: string;
  fechaCreacion: string;
  fechaModificacion: string;
  estatus: string;
  creadoPor: string;
  modificadoPor: string;
  creditos: number;
  costoMensual: number;
  urlFotoPortada: string;
  urlLogo: string;
}
export default function ListadoPaquetes(
  { paquete }: ListadoPaquetesProps,
) {
  function getEstatusPaquete(
    paquete: PaqueteModel,
  ): { descripcion: string; icono_md: string } {
    switch (paquete.estatus) {
      case "instalando":
        return {
          descripcion: "Instalando paquete",
          icono_md: "deployed_code_history",
        };
      case "detenido":
        return {
          descripcion: "Paquete detenido",
          icono_md: "deployed_code_alert",
        };
      case "ok":
        return {
          descripcion: "Funcionando",
          icono_md: "deployed_code",
        };
      default:
        return {
          descripcion: "",
          icono_md: "deployed_code_alert",
        };
    }
  }
  return (
    <>
      {/* Titulo */}
      <h2 class="headline-medium">
        {paquete.nombre}
      </h2>
      <div>
        <MaterialIcon name={getEstatusPaquete(paquete).icono_md}/> {getEstatusPaquete(paquete).descripcion}
      </div>

      <section class="mt-8">
        <h3 class="title-medium mb-3"><MaterialIcon name="folder_open"/> Finanzas</h3>
        <div class="pl-5">
            <span class="label-medium">Creditos: {paquete.creditos}</span>
        </div>
      </section>
      <section class="mt-4">
        <h3 class="title-medium mb-3"><MaterialIcon name="folder_open"/> Recursos</h3>
        <div class="pl-5">
            <span class="label-medium">No tienes recursos actualmente.</span>
        </div>
      </section>
      <section class="mt-4">
        <h3 class="title-medium mb-3"><MaterialIcon name="atr"/> Despliegue - Funcionalidad temporal</h3>
        <div class="pl-5">
          <a
            tabIndex={-1}
            href={`/paquete/${paquete.id}/despliegue`}
          >
            <ButtonFilled>Desplegar app</ButtonFilled>
          </a>
        </div>
      </section>
    </>
  );
}
