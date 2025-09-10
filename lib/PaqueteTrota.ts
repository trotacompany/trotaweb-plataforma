export interface PaqueteTrota {
  id: string;
  nombre: string;
  descripcion: string;
  fechaCreacion: string;
  fechaModificacion: string;
  estatus: PaqueteTrotaEstatus;
  creadoPor: string;
  modificadoPor: string;
  creditos: number;
  costoMensual: number;
  urlFotoPortada: string;
  urlLogo: string;
}
export type PaqueteTrotaEstatus = "instalando" | "detenido" | "ok";
