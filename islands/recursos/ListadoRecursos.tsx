import MaterialIcon from "../MaterialIcon.tsx";
interface ListadoRecursosPaqueteProps {
  id_usuario: string;
}
export default function ListadoRecursosPaquete(
  { id_usuario }: ListadoRecursosPaqueteProps,
) {
  /*
  useEffect(() => {
    CargarPaquetes();
  }, []);
const CargarPaquetes = async () => {
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
  };*/

  return (
    <>
      <div class="comp-list">
        <div class={`item`}>
          <button type="button">
            <div class="leading">
              <div class="icon">
                <MaterialIcon name="database"></MaterialIcon>
              </div>
            </div>
            <div>
              Almacenamiento en la nube
              <div class="supporting-text">10gb x 750/mes</div>
            </div>
          </button>
        </div>

        <div class={`item`}>
          <button type="button">
            <div class="leading">
              <div class="icon">
                <MaterialIcon name="cloud_upload"></MaterialIcon>
              </div>
            </div>
            <div>
              Servicio de despliegue
              <div class="supporting-text">app x 3.000/mes</div>
            </div>
          </button>
        </div>
        
        <div class={`item`}>
          <button type="button">
            <div class="leading">
              <div class="icon">
                <MaterialIcon name="cloud_upload"></MaterialIcon>
              </div>
            </div>
            <div>
              Servicio de despliegue de QA
              <div class="supporting-text">proximamente x 1.000/mes</div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
