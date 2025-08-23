import { safeFetch } from "../../lib/api.ts";
interface MenuDespliegueTemporalProps {
  id_paquete: string;
}
export default function MenuDespliegueTemporal(
  { id_paquete }: MenuDespliegueTemporalProps,
) {
  const handleSubirArchivo = async (event: Event) => {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      alert("Por favor selecciona un archivo");
      return;
    }

    const file = input.files[0];
    const tiposPermitidos = [
      "zip",
      "application/octet-stream",
      "application/zip",
      "application/x-zip",
      "application/x-zip-compressed",
    ];

    if (!tiposPermitidos.includes(file.type)) {
      alert("Formato no permitido. Use archivo comprimido ZIP");
      return;
    }

    if (file.size > 1024 * 1024 * 1024) { // 1GB
      alert("El archivo es demasiado grande (máximo 1GB)");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id_paquete", id_paquete);

      const response = await fetch(
        "/api/private/paquete/servicioDespliegueSubir",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          await cerrarSesion();
        } else {
          const data = await response.json();
          alert(data.message || "Error al subir el archivo");
        }
        return;
      }

      alert("Archivo subido exitosamente");
      input.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error de conexión al subir el archivo");
    }
  };

  const cerrarSesion = async () => {
    const response = await safeFetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (response.success) globalThis.location.href = "/";
  };
  return (
    <>
      <div>
        <div class="textfield-outlined">
          <input
            type="file"
            accept=".zip,application/zip,application/x-zip-compressed"
            onChange={handleSubirArchivo}
            aria-label="Subir archivo comprimido ZIP"
          />
          <label>Archivo comprimido</label>
        </div>
        <div class="supporting-text">
          Solo se aceptan archivos .zip (máximo 1GB)
        </div>
      </div>
    </>
  );
}
