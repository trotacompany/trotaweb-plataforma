export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  code: number;
}
export interface ModeloRespuestaStandard {
  success: boolean;
  message: string;
  // deno-lint-ignore no-explicit-any
  data: any;
  code: number;
}
export interface DatosPerfil {
  nombre: string;
  correo: string;
  licencia: string;
  licencia_version: string;
  url_foto_perfil: string;
  fecha_creacion: string;
  estatus: string;
  creditos: string;
  id : string;
}
export interface State {
  datosPerfil: DatosPerfil;
}

export interface AppProps {
  datosPerfil: DatosPerfil;
}
