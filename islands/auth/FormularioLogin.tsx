import { useEffect, useState } from "preact/hooks";
import { ButtonFilled } from "../../components/ButtonFilled.tsx";
import { ButtonText } from "../../components/ButtonText.tsx";
import { safeFetch } from "../../lib/api.ts";
import MaterialIcon from "../MaterialIcon.tsx";

interface DatosLogin {
  correo: string;
  password: string;
}
interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  telefono: string | null;
  fecha_nacimiento: string | null;
  estatus: string;
  activo: boolean;
  id_usuario_github: string | null;
  url_foto_perfil: string | null;
  fecha_creacion: string | null;
  fecha_modificacion: string | null;
  creado_por: string | null;
  modificado_por: string | null;
}
interface LoginResponse {
  usuario: Usuario;
  token_publico: string;
}

export default function FormularioLogin() {
  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [signInErrorServer, setSignInErrorServer] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [formData, setFormData] = useState<DatosLogin>({
    correo: "",
    password: "",
  });
  const [attemptCount, setAttemptCount] = useState(0);
  const isRateLimited = attemptCount >= 5;

  useEffect(() => {
    const prefill_email = sessionStorage.getItem("login_prellenado");
    if (prefill_email) {
      sessionStorage.removeItem("login_prellenado");
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          correo: prefill_email,
          password: "",
        }));
      }, 250);
    }

    // Limpiar contador de intentos después de 15 minutos
    const timer = setTimeout(() => {
      setAttemptCount(0);
    }, 15 * 60 * 1000);

    return () => clearTimeout(timer);
  }, []);

  function actualizarFormulario<K extends keyof DatosLogin>(
    key: K,
    value: DatosLogin[K],
  ) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (isRateLimited) {
      setSignInErrorServer(true);
      return;
    }
    if (!formData.correo || !formData.password) {
      setSignInError(true);
      return;
    }

    try {
      setSignInError(false);
      setSignInErrorServer(false);
      setLoading(true);

      const urlParams = new URLSearchParams(globalThis.location.search);
      const redirectId = urlParams.get("redirect_id");
      const redirect_uri = redirectId ? `/${redirectId}` : "/inicio";

      const response = await safeFetch<LoginResponse>("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: formData.correo.trim().toLowerCase(),
          password: formData.password,
          id_dispositivo: "",
        }),
      });

      if (response.success) {
        setSignInSuccess(true);
        setAttemptCount(0);
        setTimeout(() => {
          globalThis.location.href = redirect_uri;
        }, 500);
      } else {
        setAttemptCount((prev) => prev + 1);
        setLoading(false);
        setSignInError(true);
      }
    } catch (error) {
      setAttemptCount((prev) => prev + 1);
      setSignInErrorServer(true);
      setLoading(false);
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} class="flex flex-col gap-4 p-2 pr-4">
        {!signInSuccess && (
          <>
            <div>
              <div class="textfield-outlined">
                <div class="leading">
                  <MaterialIcon name="email"></MaterialIcon>
                </div>
                <input
                  value={formData.correo}
                  required
                  placeholder="Correo electrónico"
                  onInput={(e) =>
                    actualizarFormulario(
                      "correo",
                      e.currentTarget.value,
                    )}
                  type="email"
                />
                <label>Correo electrónico</label>
              </div>
            </div>

            <div>
              <div class="textfield-outlined">
                <div class="leading">
                  <MaterialIcon name="key"></MaterialIcon>
                </div>
                <input
                  value={formData.password}
                  required
                  placeholder="Contraseña"
                  onInput={(e) =>
                    actualizarFormulario(
                      "password",
                      e.currentTarget.value,
                    )}
                  type="password"
                />
                <label>Contraseña</label>
              </div>
            </div>
          </>
        )}

        {isRateLimited && (
          <div
            class="am-bg-warning mt-4 am-text-on-warning p-3 am-rounded-lg"
            role="alert"
          >
            <strong>Demasiados intentos fallidos</strong>
            <p class="body-small">
              Por seguridad, espere 15 minutos antes de intentar nuevamente.
            </p>
          </div>
        )}
        {signInError && !isRateLimited && (
          <div
            class="am-bg-error mt-4 am-text-on-error p-2 am-rounded-lg"
            role="alert"
          >
            <label>No pudimos encontrar esta cuenta</label>
          </div>
        )}
        {signInErrorServer && (
          <div
            class="am-bg-error mt-4 am-text-on-error p-2 am-rounded-lg"
            role="alert"
          >
            <label>
              Hubo un error inesperado, por favor intente más tarde.
            </label>
          </div>
        )}
        {signInSuccess && (
          <div
            class="am-bg-success mt-4 am-text-on-success p-2 am-rounded-lg"
            role="alert"
          >
            <label>Ingresando</label>
          </div>
        )}
        <div class="text-right">
          <a href="/auth/registrarse" tabIndex={-1}>
            <ButtonText disabled={loading || isRateLimited}>
              Crear cuenta
            </ButtonText>
          </a>
          <ButtonFilled
            type="submit"
            disabled={loading || isRateLimited || !formData.correo ||
              !formData.password}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </ButtonFilled>
        </div>
      </form>
    </>
  );
}
