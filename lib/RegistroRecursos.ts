// registroRecursos.ts
import { RecursoInformacionAlfaV1 } from "./recursos/RecursoInformacionAlfaV1.tsx";
import { RecursoReiniciarDespliegueAlfaV1 } from "./recursos/RecursoReiniciarDespliegueAlfaV1.tsx";
import { RecursoSubirDespliegueAlfaV1 } from "./recursos/RecursoSubirDespliegueAlfaV1.tsx";
import { RecursoFactory } from "./RecursoTrota.tsx";

export function registrarRecursos() {

  //Desde aquí se pueden añadir más recursos
  //ATENCIÓN: Esta función se debe ejecutar previamente en los componentes para que se inicialice


  //TODO este es un recurso temporal
  RecursoFactory.registrarRecurso(
    "reiniciar-despliegue-alfa-v1",
    () => new RecursoReiniciarDespliegueAlfaV1(),
  );

  //TODO este es un recurso temporal
  RecursoFactory.registrarRecurso(
    "subir-despliegue-alfa-v1",
    () => new RecursoSubirDespliegueAlfaV1(),
  );

  //Mostrar metadatos al cliente, para hacer mejor soporte, posiblemente temporal
  RecursoFactory.registrarRecurso(
    "informacion-alfa-v1",
    () => new RecursoInformacionAlfaV1(),
  );

}
