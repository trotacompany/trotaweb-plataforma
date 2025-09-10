import { useEffect, useRef, useState } from "preact/hooks";
import MaterialIcon from "../MaterialIcon.tsx";
import { GRAPHQL_RESPONSE, safeFetch } from "../../lib/api.ts";
import { ButtonFilled } from "../../components/ButtonFilled.tsx";
import { ButtonText } from "../../components/ButtonText.tsx";
import PanelPaquete from "./PanelPaquete.tsx";
import { PaqueteTrota } from "../../lib/PaqueteTrota.ts";
import { JSX } from "preact/jsx-runtime";

interface Props {
  id_usuario: string;
}
type DatosNuevoPaquete = { nombre: string };

//Helper para ver el estado del paquete
function getEstatusPaquete(paquete: PaqueteTrota): string {
  const estatusIcons = {
    instalando: "deployed_code_history",
    detenido: "deployed_code_alert",
    ok: "deployed_code",
  };

  return estatusIcons[paquete.estatus] || "deployed_code_alert";
}

export default function ListadoPaquetes(
  { id_usuario }: Props,
) {
  const dialogNuevoPaqueteRef = useRef<HTMLDialogElement>(null);
  const [formData, setFormData] = useState<DatosNuevoPaquete>({ nombre: "" });
  const [paquetes, setPaquetes] = useState<PaqueteTrota[]>([]);
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState<
    PaqueteTrota | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    cargarPaquetes();
  }, []);

  const cargarPaquetes = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await safeFetch<{ paquetes: PaqueteTrota[] }>(
        "/api/private/cuenta/listadoPaquetes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_usuario }),
        },
        GRAPHQL_RESPONSE,
      );
      if (response.success) {
        const datos = response.data;
        if (datos.paquetes.length > 0) {
          setPaquetes(datos.paquetes);
        }
      }
    } catch (error) {
      console.error("Error cargando paquetes:", error);
    } finally {
      setLoading(false);
    }
  };

  const abrirDialogNuevoPaquete = (): void => {
    dialogNuevoPaqueteRef.current?.showModal();
  };
  const cerrarDialog = (): void => {
    dialogNuevoPaqueteRef.current?.close();
    setFormData({ nombre: "" });
  };

  const handleSubmit = async (e: Event): Promise<void> => {
    e.preventDefault();
    await crearPaquete();
  };

  const actualizarFormulario = (
    key: keyof DatosNuevoPaquete,
    value: string,
  ): void => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const crearPaquete = async (): Promise<void> => {
    if (!formData.nombre.trim() || formData.nombre.length < 3) return;

    setCreating(true);
    try {
      const response = await safeFetch<{ paquetes: PaqueteTrota[] }>(
        "/api/private/paquete/ingresarPaquete",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ nombre: formData.nombre.trim() }),
        },
      );

      if (response.success) {
        cerrarDialog();
        await cargarPaquetes(); // Recargar la lista de paquetes
      }
    } catch (error) {
      console.error("Error creando paquete:", error);
    } finally {
      setCreating(false);
    }
  };
  const seleccionarPaquete = (paquete: PaqueteTrota): void => {
    setPaqueteSeleccionado(paquete);
  };

  ///Dialog para crear paquete, luego se renderiza en el return
  const renderDialogNuevoPaquete = (): JSX.Element => (
    <dialog class="comp-dialog" ref={dialogNuevoPaqueteRef}>
      <div>
        <div class="icon">
          <MaterialIcon name="add" />
        </div>
        <div class="headline">Añadir paquete</div>
        <div class="supporting-text">
          Crear paquetes no tiene costo, pero para usarlos debes recargar
          créditos.
        </div>
        <form onSubmit={handleSubmit}>
          <div class="body">
            <div class="textfield-outlined">
              <input
                type="text"
                required
                minLength={3}
                placeholder="Nombre del paquete"
                value={formData.nombre}
                onInput={(e) =>
                  actualizarFormulario("nombre", e.currentTarget.value)}
                disabled={creating}
              />
              <label>Nombre del paquete</label>
            </div>
            <div class="supporting-text">
              Puedes usar el formato de nombre que quieras.
            </div>
          </div>
          <div class="actions">
            <ButtonText
              type="button"
              onClick={cerrarDialog}
              disabled={creating}
            >
              Cancelar
            </ButtonText>
            <ButtonText type="submit" disabled={creating}>
              {creating ? "Creando..." : "Crear"}
            </ButtonText>
          </div>
        </form>
      </div>
    </dialog>
  );

  /// Listado de paquetes, luego se renderiza parte del render del panel izquierdo
  const renderListaPaquetes = (): JSX.Element => (
    <div
      class="comp-list gap-2"
      style="--comp-list-item-container-shape:var(--sys-shape-corner-medium)"
    >
      {paquetes.map((paquete) => (
        <div
          key={paquete.id}
          class={`item ${
            paqueteSeleccionado?.id === paquete.id ? "selected" : ""
          }`}
        >
          <button
            onClick={() => seleccionarPaquete(paquete)}
            type="button"
            class="w-full text-left"
          >
            <div class="leading">
              <div
                class="avatar"
                style={`background-image: url('${
                  paquete.urlLogo || "/logo.png"
                }');`}
              />
            </div>
            <div class="flex-1 min-w-0">
              <div class="body-medium truncate">{paquete.nombre}</div>
              <div class="supporting-text truncate">{paquete.descripcion}</div>
            </div>
            <div class="trailing">
              <MaterialIcon name={getEstatusPaquete(paquete)} />
            </div>
          </button>
        </div>
      ))}
    </div>
  );

  const renderPanelIzquierdo = (): JSX.Element => (
    <div class="panel flex-1" style="max-width:356px;">
      {loading
        ? (
          <div class="text-center content-center p-8 h-100">
            <MaterialIcon name="conveyor_belt" size={48} />
            <p class="body-medium">Cargando paquetes...</p>
          </div>
        )
        : paquetes.length === 0
        ? (
          <div class="text-center p-8">
            <MaterialIcon name="package_2" size={48} />
            <p class="body-medium">No tienes paquetes aún</p>
            <br />
            <ButtonFilled onClick={abrirDialogNuevoPaquete} icon="add">
              Crear paquete
            </ButtonFilled>
          </div>
        )
        : (
          <>
            <div class="text-center mb-4 mt-4">
              <ButtonFilled onClick={abrirDialogNuevoPaquete} icon="add">
                Nuevo paquete
              </ButtonFilled>
            </div>
            {renderListaPaquetes()}
          </>
        )}
    </div>
  );

  const renderPanelDerecho = (): JSX.Element => (
    <div class="panel flex-1">
      {paqueteSeleccionado
        ? <PanelPaquete paquete={paqueteSeleccionado} />
        : (
          <div class="text-center p-8 h-100 content-center">
            <MaterialIcon name="info" size={48} />
            <p class="body-large">
              Selecciona un paquete para ver los detalles
            </p>
          </div>
        )}
    </div>
  );

  return (
    <>
      {/* Dialog crear paquete */}
      {renderDialogNuevoPaquete()}

      {
        /* Layout de 2 filas, a la izquierda el listado de paquetes con un botón para
      agregar un paquete vía dialog. Y a la derecha se muestra el detalle del paquete
      seleccionado, o un mensaje de que debe seleccionar uno */
      }
      <main class="flex flex-row gap-2 mt-4">
        {/* Panel izquierdo - Listado y crear paquete */}
        {renderPanelIzquierdo()}
        {/* Panel derecho - Detalles del paquete */}
        {renderPanelDerecho()}
      </main>
    </>
  );
}
