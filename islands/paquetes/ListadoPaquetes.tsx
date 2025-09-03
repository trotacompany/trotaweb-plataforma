import { useEffect, useRef, useState } from "preact/hooks";
import MaterialIcon from "../MaterialIcon.tsx";
import { GRAPHQL_RESPONSE, safeFetch } from "../../lib/api.ts";
import { ButtonFilled } from "../../components/ButtonFilled.tsx";
import { ButtonText } from "../../components/ButtonText.tsx";
import PanelPaquete from "./PanelPaquete.tsx";
interface ListadoPaquetesProps {
  id_usuario: string;
}
interface ListadoPaquetesResponse {
  paquetes: PaqueteModel[];
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
interface CrearPaqueteResponse {
  id: string;
}
interface DatosNuevoPaquete {
  nombre: string;
}

export default function ListadoPaquetes(
  { id_usuario }: ListadoPaquetesProps,
) {
  const dialogNuevoPaqueteRef = useRef<HTMLDialogElement>(null);
  const [formData, setFormData] = useState<DatosNuevoPaquete>({ nombre: "" });
  const [paquetes, setPaquetes] = useState<PaqueteModel[]>([]);
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState<
    PaqueteModel | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPaquetes();
  }, []);

  const cargarPaquetes = async () => {
    setLoading(true);
    const response = await safeFetch<ListadoPaquetesResponse>(
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
    setLoading(false);
  };

  const abrirDialogNuevoPaquete = () => {
    dialogNuevoPaqueteRef.current?.showModal();
  };
  const cerrarDialog = () => {
    dialogNuevoPaqueteRef.current?.close();
    setFormData({ nombre: "" });
  };
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    await crearPaquete();
  };
  const actualizarFormulario = (
    key: keyof DatosNuevoPaquete,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  function getEstatusPaquete(paquete: PaqueteModel) {
    if (paquete.estatus === "instalando") {
      return "deployed_code_history";
    }
    return "deployed_code";
  }
  const crearPaquete = async () => {
    const response = await safeFetch<CrearPaqueteResponse>(
      "/api/private/paquete/ingresarPaquete",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ nombre: formData.nombre }),
      },
    );

    if (response.success) {
      cerrarDialog();
      cargarPaquetes();
    }
  };
  return (
    <>
      {/* Dialog crear paquete */}
      <dialog class="comp-dialog" ref={dialogNuevoPaqueteRef}>
        <div>
          <div class="icon">
            <MaterialIcon name="add"></MaterialIcon>
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
                  onInput={(e) => {
                    actualizarFormulario("nombre", e.currentTarget.value);
                  }}
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
                onClick={() => {
                  dialogNuevoPaqueteRef.current?.close();
                }}
              >
                Cancelar
              </ButtonText>
              <ButtonText type="submit">Crear</ButtonText>
            </div>
          </form>
        </div>
      </dialog>

      <main class="flex flex-row gap-2">
        {/* Panel izquierdo */}
        <div class="panel flex-1" style="max-width:356px;">
          {!loading
            ? (
              <>
                {paquetes.length === 0
                  ? (
                    <div class="text-center p-8">
                      <MaterialIcon
                        name="package_2"
                        size={48}
                      />
                      <p class="body-medium">No tienes paquetes aún</p>
                      <br />
                      <ButtonFilled
                        onClick={abrirDialogNuevoPaquete}
                        icon="add"
                      >
                        Crear paquete
                      </ButtonFilled>
                    </div>
                  )
                  : (
                    <>
                      <div class="text-center mb-4 mt-4">
                        <ButtonFilled
                          onClick={abrirDialogNuevoPaquete}
                          icon="add"
                        >
                          Nuevo paquete
                        </ButtonFilled>
                      </div>
                      <div class="comp-list">
                        {paquetes.map((paquete) => (
                          <div
                            class={`item ${
                              paqueteSeleccionado?.id == paquete.id
                                ? "selected"
                                : ""
                            }`}
                          >
                            <button
                              onClick={() => {
                                setPaqueteSeleccionado(paquete);
                              }}
                              type="button"
                            >
                              <div class="leading">
                                <div
                                  class="avatar"
                                  style={`background-image: url('${
                                    paquete.urlLogo ?? "/logo.png"
                                  }');`}
                                >
                                </div>
                              </div>
                              <div>
                                {paquete.nombre}
                                <div class="supporting-text"></div>
                              </div>
                              <div class="trailing">
                                <MaterialIcon name={getEstatusPaquete(paquete)}>
                                </MaterialIcon>
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
              </>
            )
            : (
              <>
                <div class="text-center content-center p-8 h-100 content-center">
                  <MaterialIcon
                    name="conveyor_belt"
                    size={48}
                  />
                  <p class="body-medium">Cargando paquetes...</p>
                </div>
              </>
            )}
        </div>

        {/* Panel derecho - Detalles del paquete */}
        <div class="panel flex-1">
          {paqueteSeleccionado
            ? (
              <>
                {/**/}
                <PanelPaquete paquete={paqueteSeleccionado} />
              </>
            )
            : (
              <div class="text-center p-8 h-100 content-center">
                <MaterialIcon name="info" size={48} />
                <p class="body-large">
                  Selecciona un paquete para ver los detalles
                </p>
              </div>
            )}
        </div>
      </main>
    </>
  );
}
