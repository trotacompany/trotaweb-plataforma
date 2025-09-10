import { JSX } from "preact/jsx-runtime";
import { RecursoTrotaBase } from "../RecursoTrota.tsx";
import { PaqueteTrota } from "../PaqueteTrota.ts";
import MaterialIcon from "../../islands/MaterialIcon.tsx";
import { ButtonFilled } from "../../components/ButtonFilled.tsx";

export class RecursoSubirDespliegueAlfaV1 extends RecursoTrotaBase {
  constructor() {
    super({
      nombre: "Despliegue Alfa",
      icono: "deployed_code",
      parametros: {
        tipo: "despliegue",
        version: "v1",
        estado: "activo",
      },
    });
  }

  override renderizar(info_paquete : PaqueteTrota): JSX.Element {
    return (
      <div class="p-3 panel-high">
        <div class="body-large">Subir archivo de despliegue - {info_paquete.nombre}</div>
        <div class="body-small">Para cuando se necesite subir un archivo .zip</div>
        <div class="text-right">
          <a href={`/paquete/${info_paquete.id}/despliegue`}><ButtonFilled><MaterialIcon name="upload"/> Subir archivo</ButtonFilled></a>
        </div>
      </div>
    );
  }
}
