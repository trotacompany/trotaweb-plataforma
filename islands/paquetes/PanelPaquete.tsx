import { useState } from "preact/hooks";
import { ButtonFilled } from "../../components/ButtonFilled.tsx";
import MaterialIcon from "../MaterialIcon.tsx";
import { ButtonText } from "../../components/ButtonText.tsx";
import { JSX } from "preact/jsx-runtime";
import { safeFetch } from "../../lib/api.ts";
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
      id: crypto.randomUUID(),
      nombre: "Accesos",
      abierto: false,
      icono_md_cerrado: "language",
      icono_md_abierto: "captive_portal",
      contenido: (
        <>
          <div class="p-3">
            <span class="label-medium">Aún no hemos detectados accesos directos a tus recursos</span>
          </div>
        </>
      ),
    },
    {
      id: crypto.randomUUID(),
      nombre: "Finanzas",
      abierto: false,
      icono_md_cerrado: "folder",
      icono_md_abierto: "folder_open",
      contenido: (
        <>
          <div class="p-3">
            <span class="label-medium">Creditos: {paquete.creditos.toLocaleString('en-US')}</span>
          </div>
        </>
      ),
    },
    {
      id: crypto.randomUUID(),
      nombre: "Recursos",
      abierto: false,
      icono_md_cerrado: "folder",
      icono_md_abierto: "folder_open",
      contenido: (
        <>
          <div class="p-3">
            <span class="label-medium">No tienes recursos actualmente.</span>
          </div>
        </>
      ),
    },
    {
      id: crypto.randomUUID(),
      nombre: "Subir despliegue - Funcionalidad temporal",
      abierto: false,
      icono_md_cerrado: "arrow_right",
      icono_md_abierto: "arrow_drop_down",
      contenido: (
        <>
          <div class="p-3">
            <p class="mb-4">
              Para cuando se necesite subir un archivo .zip
            </p>
            <a
              tabIndex={-1}
              href={`/paquete/${paquete.id}/despliegue`}
            >
              <ButtonFilled>Desplegar app</ButtonFilled>
            </a>
          </div>
        </>
      ),
    },
    {
      // TODO: Se debe mover a las suscripciones de recursos, esta es una solución para los clientes actuales
      id: crypto.randomUUID(),
      nombre: "Re-desplegar - Funcionalidad temporal",
      abierto: false,
      icono_md_cerrado: "arrow_right",
      icono_md_abierto: "arrow_drop_down",
      contenido: (
        <>
          <div class="p-3">
            <p class="mb-4">
              Para cuando el archivo .zip este arriba, ejecutar este servicio. 
            </p>
            <ButtonFilled
              onClick={(_e) => {
                redesplegarTemporal();
              }}
            >
              Re-desplegar
            </ButtonFilled>
          </div>
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

  // TODO:Se debe mover a las acciones del recurso, esta es una solución para los clientes actuales
  const redesplegarTemporal = async () => {
    const response = await safeFetch("/api/recursos/despliegue/action",
      {
        method: "POST",
        body: JSON.stringify({
          id_paquete: paquete.id
        }),
        credentials: "include",
      },
    );
    if (response.success) {
      alert("El paquete se esta desplegando!");
    } else  {
      alert("Hubo un problema para desplegar el paquete");
    };
  };

  return (
    <>
      {/* Titulo */}
      <h2 className="headline-medium">
        {paquete.nombre}
      </h2>
      <div class="body-small">
        <MaterialIcon size={16} name={getEstatusPaquete(paquete).icono_md} />{" "}
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
