import { useRef, useState } from "preact/hooks";
import MaterialIcon from "../MaterialIcon.tsx";
import { ButtonText } from "../../components/ButtonText.tsx";
import { registrarRecursos } from "../../lib/RegistroRecursos.ts";
registrarRecursos();
import { PaqueteTrota } from "../../lib/PaqueteTrota.ts";
import { CarpetaFactory, CarpetaTrota } from "../../lib/CarpetaTrota.ts";
import { RecursoFactory } from "../../lib/RecursoTrota.tsx";
import ComponenteCarpetaTrota from "../ComponenteCarpetaTrota.tsx";


interface Props {
  paquete: PaqueteTrota;
}

//Helper para ver el estatus del paquete
function getEstatusPaquete(
  paquete: PaqueteTrota,
): { descripcion: string; icono_md: string } {
  const estatusMap = {
    instalando: {
      descripcion: "Instalando paquete",
      icono_md: "deployed_code_history",
    },
    detenido: {
      descripcion: "Paquete detenido", 
      icono_md: "deployed_code_alert",
    },
    ok: {
      descripcion: "Funcionando",
      icono_md: "deployed_code",
    }
  };

  return estatusMap[paquete.estatus] || {
    descripcion: "",
    icono_md: "deployed_code_alert",
  };
}


export default function ListadoPaquetes(
  { paquete }: Props,
) {
  const dialogNuevoRecursoRef = useRef<HTMLDialogElement>(null);
  const [carpetas] = useState<CarpetaTrota[]>(() => 
    inicializarCarpetasPorDefecto()
  );

  function inicializarCarpetasPorDefecto(): CarpetaTrota[] {
    return [
      CarpetaFactory.crearCarpetaSistema("Accesos"),
      CarpetaFactory.crearCarpetaSistema("Finanzas"),
      CarpetaFactory.crearCarpetaSistema("Recursos"),
      CarpetaFactory.crearCarpetaUsuario("Despliegue alfa", [
        RecursoFactory.crearRecurso("subir-despliegue-alfa-v1"),
        RecursoFactory.crearRecurso("reiniciar-despliegue-alfa-v1"),
      ]),
    ];
  }
  //Destructuring, se hace esto para evitar llamadas multiples
  const { descripcion, icono_md } = getEstatusPaquete(paquete);

  //Estilo especial para el folder tree de paquetes
  const carpetasStyles = {
    "--comp-button-text-label-color": "var(--sys-color-on-surface)",
    "--comp-button-text-icon-color": "var(--sys-color-on-surface)",
    "--comp-button-text-hovered-label-color": "var(--sys-color-on-surface)",
    "--comp-button-text-hovered-icon-color": "var(--sys-color-on-surface)",
    "--comp-button-text-focused-label-color": "var(--sys-color-on-surface)",
    "--comp-button-text-focused-icon-color": "var(--sys-color-on-surface)",
    "--comp-button-text-pressed-label-color": "var(--sys-color-on-surface)",
    "--comp-button-text-pressed-icon-color": "var(--sys-color-on-surface)",
  };

  return (
    <>
      <dialog class="comp-dialog" ref={dialogNuevoRecursoRef}>
        <div>
          <div class="icon">
            <MaterialIcon name="add"/>
          </div>
          <div class="headline">Añadir paquete</div>
          <div class="supporting-text">
            Crear paquetes no tiene costo, pero para usarlos debes recargar
            créditos.
          </div>
          <div class="body">
          </div>
          <div class="actions">
            <ButtonText
              type="button"
              onClick={() => {
                dialogNuevoRecursoRef.current?.close();
              }}
            >
              Cancelar
            </ButtonText>
          </div>
        </div>
      </dialog>

      {/* Encabezado */}
      <header class="mb-6">
        <h2 className="headline-medium">
          {paquete.nombre}
        </h2>
        <div class="body-small">
          <MaterialIcon size={16} name={icono_md} /> {descripcion}
        </div>
      </header>

      {/* Lista de carpetas */}
      <div style={carpetasStyles}>
        {carpetas.map((carpeta) => (
          <>
            <ComponenteCarpetaTrota
              key={carpeta.id}
              paquete={paquete}
              carpeta={carpeta}
              nivel={0}
            />
          </>
        ))}
      </div>
    </>
  );
}
