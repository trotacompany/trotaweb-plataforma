import { useEffect, useState } from "preact/hooks";
import { GRAPHQL_RESPONSE, safeFetch } from "../../lib/api.ts";

interface DatosActualUsuarioResponse {
  usuario: DatosActualUsuario[];
}

interface DatosActualUsuario {
  nombre: string;
  telefono: string;
  urlFotoPerfil: string;
  idUsuarioGithub: string;
  correo: string;
}

interface InformacionUsuarioProps {
  id_usuario: string;
}

export default function InformacionUsuario({ id_usuario }: InformacionUsuarioProps) {
  const [loading, setLoading] = useState(true);
  const [datosUsuario, setDatosUsuario] = useState<DatosActualUsuario>();

  useEffect(() => {
    loadContent();
  }, []);

  async function cerrarSesion() {
    const response = await safeFetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (response.success) globalThis.location.href = "/";
  }

  const handleSubirImagenPerfil = async (event: Event) => {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      alert("Por favor selecciona un archivo");
      return;
    }

    const file = input.files[0];
    const tipoImagenesPermitidas = ["image/jpeg", "image/png", "image/jpg"];

    if (!tipoImagenesPermitidas.includes(file.type)) {
      alert("Formato de imagen no permitido. Use JPEG o PNG");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("La imagen es demasiado grande (máximo 10MB)");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/private/cuenta/subirFotoPerfil", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          cerrarSesion();
        } else {
          const data = await response.json();
          alert(data.message || "Error al subir la imagen");
        }
        return;
      }
      
      loadContent();
          alert("Foto cargada, cuando vuelvas a iniciar sesión verás el cambio. Limitaciones de la Alpha.");
      
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const loadContent = async () => {
    const response = await safeFetch<DatosActualUsuarioResponse>(
      "/api/private/cuenta/datosBasicos",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario }),
      },
      GRAPHQL_RESPONSE,
    );
    
    if (response.success) {
      setLoading(false);
      if (response.data.usuario.length > 0) {
        setDatosUsuario(response.data.usuario[0]);
      }
    } else if (response.code === 401) {
      cerrarSesion();
    }
  };

  if (loading) {
    return <div class="p-4">Cargando...</div>;
  }

  return (
    <div class="flex flex-col gap-6">
      {/* Solo información esencial */}
      <div class="textfield-outlined">
        <input
          value={datosUsuario?.nombre || ""}
          type="text"
          placeholder="Nombre"
          readOnly
        />
        <label>Nombre</label>
      </div>

      <div class="textfield-outlined">
        <input
          value={datosUsuario?.correo || ""}
          type="text"
          placeholder="Correo electrónico"
          readOnly
        />
        <label>Correo electrónico</label>
      </div>

      {/* Solo el input funcional */}
      <div class="textfield-outlined">
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleSubirImagenPerfil}
          aria-label="Subir foto de perfil"
        />
        <label>Subir foto de perfil</label>
      </div>
    </div>
  );
}