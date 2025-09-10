import { JSX } from "preact/jsx-runtime";
import { PaqueteTrota } from "./PaqueteTrota.ts";

export interface RecursoTrota {
  id: string;
  nombre: string;
  icono: string;
  fechaCreacion: Date;
  fechaModificacion: Date;

  // parametros del recurso
  parametros: Record<string, unknown>;

  // Método para renderizar (cada recurso se renderiza como quiera)
  renderizar: (info_paquete: PaqueteTrota) => JSX.Element;

  // Serialización para guardar
  serializar: () => string;
}
export type RecursoTrotaConfig = Partial<RecursoTrota>;

// Implementación base simple
export class RecursoTrotaBase implements RecursoTrota {
  id: string;
  nombre: string;
  icono: string;
  fechaCreacion: Date;
  fechaModificacion: Date;
  parametros: Record<string, unknown>;

  constructor(config: Partial<RecursoTrota> = {}) {
    this.id = config.id || crypto.randomUUID();
    this.nombre = config.nombre || "Nuevo Recurso";
    this.icono = config.icono || "widgets";
    this.fechaCreacion = config.fechaCreacion || new Date();
    this.fechaModificacion = config.fechaModificacion || new Date();
    this.parametros = config.parametros || {};
  }

  renderizar(infoPaquete: PaqueteTrota): JSX.Element {
    return (
      <div class="p-3">
        <span class="body-medium">Recurso: {this.nombre}</span>
        <div class="body-small">Paquete: {infoPaquete.nombre}</div>
      </div>
    );
  }

  serializar(): string {
    return JSON.stringify({
      id: this.id,
      nombre: this.nombre,
      icono: this.icono,
      fechaCreacion: this.fechaCreacion.toISOString(),
      fechaModificacion: this.fechaModificacion.toISOString(),
      parametros: this.parametros,
    });
  }
  clonar(configExtra?: RecursoTrotaConfig): RecursoTrotaBase {
    return new RecursoTrotaBase({
      ...this,
      ...configExtra,
      id: crypto.randomUUID(),
      fechaCreacion: new Date(),
      fechaModificacion: new Date(),
    });
  }
}

export type RecursoConstructor = () => RecursoTrota;

// Factory para crear recursos
export class RecursoFactory {
  private static registry = new Map<string, RecursoConstructor>();

  static crearRecurso(
    tipo: string,
    config?: RecursoTrotaConfig,
  ): RecursoTrotaBase {
    const constructor = this.registry.get(tipo);
    if (!constructor) {
      throw new Error(`Tipo de recurso no encontrado: ${tipo}`);
    }

    const recurso = constructor();
    if (!(recurso instanceof RecursoTrotaBase)) {
      throw new Error(
        `El recurso ${tipo} no es una instancia de RecursoTrotaBase`,
      );
    }

    if (config) {
      Object.keys(config).forEach((key) => {
        if (key in recurso) {
          // deno-lint-ignore no-explicit-any
          (recurso as any)[key] = config[key as keyof RecursoTrotaConfig];
        }
      });
    }

    return recurso;
  }

  static registrarRecurso(tipo: string, constructor: RecursoConstructor): void {
    if (this.registry.has(tipo)) {
      console.warn(`Sobrescribiendo recurso registrado: ${tipo}`);
    }
    this.registry.set(tipo, constructor);
  }

  // Método para obtener tipos registrados
  static obtenerTiposRegistrados(): string[] {
    return Array.from(this.registry.keys());
  }

  // Método para verificar si un tipo existe
  static existeTipo(tipo: string): boolean {
    return this.registry.has(tipo);
  }

  // Método para limpiar registro
  static limpiarRegistro(): void {
    this.registry.clear();
  }
}

// Helper para crear recursos con tipo seguro
export function crearRecurso<T extends RecursoTrotaBase>(
  tipo: string,
  config?: RecursoTrotaConfig,
): T {
  const recurso = RecursoFactory.crearRecurso(tipo, config);
  return recurso as T;
}
