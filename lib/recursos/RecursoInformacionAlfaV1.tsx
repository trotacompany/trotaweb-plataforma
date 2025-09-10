import { JSX } from "preact/jsx-runtime";
import { RecursoTrotaBase } from "../RecursoTrota.tsx";
import { PaqueteTrota } from "../PaqueteTrota.ts";

export class RecursoInformacionAlfaV1 extends RecursoTrotaBase {
  constructor() {
    super({
      nombre: "Información Alfa V1",
      icono: "info",
      parametros: {
      },
    });
  }

  override renderizar(info_paquete : PaqueteTrota): JSX.Element {
    return (
      <div class="p-3 panel-high">
        <div class="body-large">Información del paquete</div>
        <div class="body-medium">
          ID : {info_paquete.id}<br></br>
          Creado por : {info_paquete.creadoPor} <br></br>
          Creado el : {info_paquete.fechaCreacion.split("T")[0]} 
        </div>
      </div>
    );
  }
}
