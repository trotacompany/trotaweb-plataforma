import { useEffect, useRef, useState } from "preact/hooks";
import { ButtonFilled } from "../../components/ButtonFilled.tsx";
import MaterialIcon from "../MaterialIcon.tsx";
import { ButtonText } from "../../components/ButtonText.tsx";
import { JSX } from "preact/jsx-runtime";
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
interface PaqueteCarpeta {
  id: string;
  nombre: string;
  abierto: boolean;
  icono_md_cerrado: string;
  icono_md_abierto: string;
  contenido: JSX.Element;
}
export default function ListadoPaquetes(
  { paquete }: ListadoPaquetesProps,
) {
  const [carpetas, setCarpetas] = useState<PaqueteCarpeta[]>([
    {
      id : crypto.randomUUID(),
      nombre: "Finanzas",
      abierto: false,
      icono_md_cerrado: "folder",
      icono_md_abierto: "folder_open",
      contenido: (
        <>
          <span class="label-medium">Creditos: {paquete.creditos}</span>
        </>
      ),
    },
    {
      id : crypto.randomUUID(),
      nombre: "Recursos",
      abierto: false,
      icono_md_cerrado: "folder",
      icono_md_abierto: "folder_open",
      contenido: (
        <>
          <span class="label-medium">No tienes recursos actualmente.</span>
        </>
      ),
    },
    {
      id : crypto.randomUUID(),
      nombre: "Despliegue - Funcionalidad temporal",
      abierto: true,
      icono_md_cerrado: "arrow_right",
      icono_md_abierto: "arrow_drop_down",
      contenido: (
        <>
          <a
            tabIndex={-1}
            href={`/paquete/${paquete.id}/despliegue`}
          >
            <ButtonFilled>Desplegar app</ButtonFilled>
          </a>
        </>
      ),
    },
  ]);

  const toggleCarpeta = (carpetaId: string) => {
    setCarpetas((prev) =>
      prev.map((carpeta) =>
        carpeta.id === carpetaId
          ? { ...carpeta, abierto: !carpeta.abierto }
          : carpeta
      )
    );
  };

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
      <h2 className="headline-medium">
        {paquete.nombre}
      </h2>
      <div>
        <MaterialIcon name={getEstatusPaquete(paquete).icono_md} />{" "}
        {getEstatusPaquete(paquete).descripcion}
      </div>

      <div
        style={{
          "--comp-button-text-label-color": "var(--sys-color-on-surface)",
          "--comp-button-text-icon-color": "var(--sys-color-on-surface)",
          "--comp-button-text-hovered-label-color":
            "var(--sys-color-on-surface)",
          "--comp-button-text-hovered-icon-color":
            "var(--sys-color-on-surface)",
          "--comp-button-text-focused-label-color":
            "var(--sys-color-on-surface)",
          "--comp-button-text-focused-icon-color":
            "var(--sys-color-on-surface)",
          "--comp-button-text-pressed-label-color":
            "var(--sys-color-on-surface)",
          "--comp-button-text-pressed-icon-color":
            "var(--sys-color-on-surface)",
        }}
      >
        {carpetas.map((carpeta) => (
          <>
            <section className="mt-4">
              {carpeta.abierto
                ? (
                  <>
                    <ButtonText
                      onClick={() => {
                        toggleCarpeta(carpeta.id);
                      }}
                    >
                      <MaterialIcon name={carpeta.icono_md_abierto} />
                      {carpeta.nombre}
                    </ButtonText>
                    <div class="ml-5 mt-2 panel-high">
                      {carpeta.contenido}
                    </div>
                  </>
                )
                : (
                  <>
                    <ButtonText
                      onClick={() => {
                        toggleCarpeta(carpeta.id);
                      }}
                    >
                      <MaterialIcon name={carpeta.icono_md_cerrado} />
                      {carpeta.nombre}
                    </ButtonText>
                  </>
                )}
            </section>
          </>
        ))}
      </div>
    </>
  );
}
