// islands/ComponenteCarpetaTrota.tsx
import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { ButtonText } from "../components/ButtonText.tsx";
import { RecursoTrotaBase } from "../lib/RecursoTrota.tsx";
import { CarpetaTrota } from "../lib/CarpetaTrota.ts";
import MaterialIcon from "./MaterialIcon.tsx";
import { PaqueteTrota } from "../lib/PaqueteTrota.ts";

interface Props {
  paquete: PaqueteTrota;
  carpeta: CarpetaTrota;
  nivel : number;
}

export default function ComponenteCarpetaTrota({ paquete, carpeta, nivel = 0 }: Props) {
  const [abierto, setAbierto] = useState(false);

  const toggleCarpeta = () => {
    setAbierto(!abierto);
  };

  const renderizarItem = (item: RecursoTrotaBase | CarpetaTrota): JSX.Element => {
    // Si es una subcarpeta
    if ('tipo' in item && (item.tipo === 'sistema' || item.tipo === 'usuario')) {
      return (
        <ComponenteCarpetaTrota 
          key={item.id} 
          paquete={paquete} 
          carpeta={item as CarpetaTrota} 
          nivel={nivel + 1}
        />
      );
    }
    
    // Si es un recurso
    if ('renderizar' in item) {
      return (
        <div key={item.id} class="mb-2 p-2 border rounded">
          {item.renderizar(paquete)}
        </div>
      );
    }
    
    // Fallback por si acaso
    return (
      <div key={item.id} class="mb-2">
        <span class="body-medium">❓ Item desconocido: {item.nombre}</span>
      </div>
    );
  };

  const renderizarContenido = (): JSX.Element => {
    const recursos = carpeta.obtenerRecursos();
    const subCarpetas = carpeta.obtenerSubCarpetas();
    
    //Si la carpeta no tiene items
    if (recursos.length === 0 && subCarpetas.length === 0) {
      return (
        <div class="contenido-carpeta-trota" style={`margin-left: ${35 + (0 * nivel)}px`}>
          <div class="mb-4 p-2">
            <span class="label-medium" style="color: var(--sys-color-outline);">
              No hay contenido en la carpeta {carpeta.nombre}
            </span>
          </div>
        </div>
      );
    }

    return (
        <div class="contenido-carpeta-trota" style={`margin-left: ${35 + (0 * nivel)}px`}>
        {/* Primero renderizar subcarpetas */}
        {subCarpetas.length > 0 && (
          <div class="mb-4">
            {subCarpetas.map(renderizarItem)}
          </div>
        )}
        
        {/* Luego renderizar recursos */}
        {recursos.length > 0 && (
          <div>
            {recursos.map(renderizarItem)}
          </div>
        )}
      </div>
    );
  };

  return (
    <section class="mt-4">
      <ButtonText
        onClick={toggleCarpeta}
        style={{
          color: "var(--sys-color-on-surface)",
        }}
      >
        <MaterialIcon 
          name={abierto ? (carpeta.iconoAbierto || "folder_open") : carpeta.icono} 
        />
        {carpeta.nombre}
      </ButtonText>
      
      {abierto && renderizarContenido()}
    </section>
  );
}