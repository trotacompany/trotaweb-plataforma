import AppBarMedium from "../components/AppBarMedium.tsx";
import { IconButtonStandard } from "../components/IconButtonStandard.tsx";
import MaterialIcon from "./MaterialIcon.tsx";
import { safeFetch } from "../lib/api.ts";

interface CabeceraPlataformaProps {
  nombre_usuario: string;
  foto_perfil: string;
  titulo: string;
  subtitulo: string;
}

export default function CabeceraPlataforma(
  { foto_perfil, titulo, subtitulo }: CabeceraPlataformaProps,
) {
  async function CerrarSesion() {
    const response = await safeFetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (response.success) globalThis.location.href = "/";
  }
  return (
    <>
      <AppBarMedium
        leading={
          <IconButtonStandard
            style={`background-size:cover; background-color:var(--sys-color-surface-container-high); background-position:center; background-image: url('${foto_perfil}')`}
          >
            <MaterialIcon name="" />
          </IconButtonStandard>
        }
        title={titulo}
        subtitle={subtitulo}
        trailing={
          <>
            <IconButtonStandard
              onClick={CerrarSesion}
            >
              <MaterialIcon name="logout" />
            </IconButtonStandard>
          </>
        }
      />
    </>
  );
}
