import { JSX } from "preact/jsx-runtime";
import { RecursoTrotaBase } from "../RecursoTrota.tsx";
import { safeFetch } from "../api.ts";
import { PaqueteTrota } from "../PaqueteTrota.ts";
import MaterialIcon from "../../islands/MaterialIcon.tsx";
import { ButtonFilled } from "../../components/ButtonFilled.tsx";

export class RecursoReiniciarDespliegueAlfaV1 extends RecursoTrotaBase {
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
        <div class="body-large">Reiniciar tu app - {info_paquete.nombre}</div>
        <div class="body-small">
          Haz esto cada vez que quieras aplicar un nuevo despliegue
        </div>
        <div class="text-right">
          <ButtonFilled onClick={() => this.ejecutarDespliegue(info_paquete.id)}><MaterialIcon name="update"/> Re-desplegar</ButtonFilled>
        </div>
      </div>
    );
  }

  private async ejecutarDespliegue(id : string) {
    const response = await safeFetch("/api/recursos/despliegue/action", {
      method: "POST",
      body: JSON.stringify({
        id_paquete: id,
      }),
      credentials: "include",
    });
    if (response.success) {
      alert("El paquete se esta desplegando!");
    } else {
      alert("Hubo un problema para desplegar el paquete");
    }
  }
}
