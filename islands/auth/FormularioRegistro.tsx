import { useState } from "preact/hooks";
import { safeFetch } from "../../lib/api.ts";
import { ButtonFilled } from "../../components/ButtonFilled.tsx";
import { SelectField, TextField } from "../../components/TextFields.tsx";

interface DatosRegistro {
  nombre_completo: string;
  correo: string;
  fecha_nacimiento_types: {
    dia: string;
    mes: string;
    anio: string;
  };
  fecha_nacimiento: string;
  password: string;
  password_repetir: string;
  terminos_condiciones_aceptados: string;
}

interface RegisterResponse {
  user_id: string;
}

export default function FormularioRegistro() {
  const [formData, setFormData] = useState<DatosRegistro>({
    nombre_completo: "",
    correo: "",
    fecha_nacimiento_types: { dia: "", mes: "", anio: "" },
    fecha_nacimiento: "",
    password: "",
    password_repetir: "",
    terminos_condiciones_aceptados: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = <K extends keyof DatosRegistro>(
    field: K,
    value: DatosRegistro[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const updateDateField = (
    field: keyof DatosRegistro["fecha_nacimiento_types"],
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      fecha_nacimiento_types: {
        ...prev.fecha_nacimiento_types,
        [field]: value,
      },
    }));
  };

  const isPasswordValido = (password: string): boolean => {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    if (!/[^A-Za-z0-9]/.test(password)) return false;
    return true;
  };

  const validarFormulario = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre_completo) {
      newErrors.nombre_completo = "Nombre completo es requerido";
    }

    if (!formData.correo.trim() || !/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "Correo electrónico válido es requerido";
    }

    if (
      !formData.fecha_nacimiento_types.dia ||
      !formData.fecha_nacimiento_types.mes ||
      !formData.fecha_nacimiento_types.anio
    ) {
      newErrors.fecha_nacimiento = "Fecha de nacimiento completa es requerida";
    }

    if (!isPasswordValido(formData.password)) {
      newErrors.password =
        "La contraseña no cumple con los requisitos de seguridad";
    }

    if (formData.password !== formData.password_repetir) {
      newErrors.password_repetir = "Las contraseñas no coinciden";
    }

    if (!formData.terminos_condiciones_aceptados) {
      newErrors.terminos = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    setLoading(true);

    try {
      const fecha_nacimiento = new Date(
        `${formData.fecha_nacimiento_types.anio}-${formData.fecha_nacimiento_types.mes}-${formData.fecha_nacimiento_types.dia}`,
      ).toISOString();

      const response = await safeFetch<RegisterResponse>("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre_completo,
          correo: formData.correo,
          telefono: "",
          pais_uuid: "ffd4a45f-8f19-4800-bf7d-9984cdf6bce9",
          fecha_nacimiento,
          password: formData.password,
        }),
      });

      if (response.success) {
        sessionStorage.setItem("login_prellenado", formData.correo);
        globalThis.location.href = "/auth/login";
      } else {
        setErrors({ submit: "Error al crear la cuenta. Intenta nuevamente." });
      }
    } catch (_error) {
      setErrors({ submit: "Error de conexión. Intenta nuevamente." });
    } finally {
      setLoading(false);
    }
  };

  // Opciones para los selects de fecha
  const dias = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: String(i + 1).padStart(2, "0"),
  }));

  const meses = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: String(i + 1).padStart(2, "0"),
  }));

  const años = Array.from(
    { length: new Date().getFullYear() - 1900 + 1 },
    (_, i) => {
      const year = new Date().getFullYear() - i;
      return { value: String(year), label: String(year) };
    },
  );

  return (
    <>
      <form onSubmit={handleSubmit} class="flex flex-col gap-4">
        {/* Nombre completo */}

        <TextField
          type="text"
          value={formData.nombre_completo}
          onInput={(value) => updateField("nombre_completo", value)}
          label="Nombre completo"
          placeholder="Tu nombre completo"
          required
          autoComplete="name"
          icon="person"
        />

        {/* Correo */}
        <TextField
          type="email"
          value={formData.correo}
          onInput={(value) => updateField("correo", value)}
          label="Correo electrónico"
          placeholder="tu@email.com"
          required
          autoComplete="email"
          icon="email"
        />

        <div class="title-small mt-1">
          Fecha de nacimiento
        </div>

        <div class="flex flex-row gap-4">
          {/* Día nacimiento */}
          <SelectField
            value={formData.fecha_nacimiento_types.dia}
            onChange={(value) => updateDateField("dia", value)}
            label="Día"
            options={dias}
            required
          />

          {/* Mes nacimiento */}
          <SelectField
            value={formData.fecha_nacimiento_types.mes}
            onChange={(value) => updateDateField("mes", value)}
            label="Mes"
            options={meses}
            required
          />

          {/* Año nacimiento */}
          <SelectField
            value={formData.fecha_nacimiento_types.anio}
            onChange={(value) => updateDateField("anio", value)}
            label="Año"
            options={años}
            required
          />
        </div>

        {/* Contraseña */}
        <TextField
          type="password"
          value={formData.password}
          onInput={(value) => updateField("password", value)}
          label="Contraseña"
          placeholder="Tu contraseña segura"
          required
          minLength={8}
          autoComplete="new-password"
          icon="lock"
          supportingText="Mínimo 8 caracteres, mayúsculas, minúsculas, números y símbolos."
        />

        {/* Repetir Contraseña */}
        <TextField
          type="password"
          value={formData.password_repetir}
          onInput={(value) => updateField("password_repetir", value)}
          label="Repetir contraseña"
          placeholder="Repite tu contraseña"
          required
          minLength={8}
          autoComplete="new-password"
          icon="lock"
        />

        <div class="mt-5">
          <input
            id="terminos_condiciones"
            type="checkbox"
            checked={Boolean(formData.terminos_condiciones_aceptados)}
            onInput={(e) => updateField("terminos_condiciones_aceptados", e.currentTarget.checked.toString())}
            required
          />
          <label for="terminos_condiciones">
            Acepto temporalmente las condiciones de una aplicación en fase alpha.
          </label>
          {/* TODO: me falta el dialog de terminos y condiciones, lo sé, de momento es eeeh, participa, esto es una ALPHA */}
        </div>
        <div class="mt-4 text-right">
          <ButtonFilled type="submit" disabled={loading}>
            {loading ? "Creando cuenta..." : "Registrarse"}
          </ButtonFilled>
        </div>
      </form>
    </>
  );
}
