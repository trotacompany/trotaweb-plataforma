import { RecursoFactory, RecursoTrotaBase } from "./RecursoTrota.tsx";

export interface CarpetaTrota {
  id: string;
  nombre: string;
  tipo: "sistema" | "usuario";
  abierto: boolean;
  icono: string;
  iconoAbierto: string;
  esEliminable: boolean;
  esRenombrable: boolean;
  esMovible: boolean;
  esAnidable: boolean;

  items: (RecursoTrotaBase | CarpetaTrota)[];
  orden: number;
  padreId?: string;

  fechaCreacion: Date;
  fechaModificacion: Date;
  creadoPor: string;
  modificadoPor: string;

  agregarItem(item: RecursoTrotaBase | CarpetaTrota): void;
  eliminarItem(itemId: string): boolean;
  obtenerRecursos(): RecursoTrotaBase[];
  obtenerSubCarpetas(): CarpetaTrota[];
  serializar(): string;

  onItemAgregado?: (item: RecursoTrotaBase | CarpetaTrota) => void;
  onItemEliminado?: (itemId: string) => void;
  onEstructuraCambiada?: () => void;
}
// deno-lint-ignore no-explicit-any
export function esCarpetaTrota(item: any): item is CarpetaTrota {
  return item &&
    "tipo" in item &&
    (item.tipo === "sistema" || item.tipo === "usuario") &&
    "items" in item &&
    Array.isArray(item.items);
}

// deno-lint-ignore no-explicit-any
export function esRecursoTrotaBase(item: any): item is RecursoTrotaBase {
  return item &&
    "renderizar" in item &&
    typeof item.renderizar === "function";
}

export class CarpetaTrotaImpl implements CarpetaTrota {
  // ✅ Valores por defecto en declaración
  id = "";
  nombre = "";
  tipo: "sistema" | "usuario" = "usuario";
  icono = "folder";
  abierto = false;
  iconoAbierto = "folder_open";
  esEliminable = true;
  esRenombrable = true;
  esMovible = true;
  esAnidable = true;
  items: (RecursoTrotaBase | CarpetaTrota)[] = [];
  orden = 0;
  fechaCreacion = new Date();
  fechaModificacion = new Date();
  creadoPor = "sistema";
  modificadoPor = "sistema";
  padreId?: string;

  obtenerRecursos(): RecursoTrotaBase[] {
    return this.items.filter(esRecursoTrotaBase);
  }
  obtenerSubCarpetas(): CarpetaTrota[] {
    return this.items.filter(esCarpetaTrota);
  }

  serializar(): string {
    return JSON.stringify({
      id: this.id,
      nombre: this.nombre,
      tipo: this.tipo,
      icono: this.icono,
      iconoAbierto: this.iconoAbierto,
      esEliminable: this.esEliminable,
      esRenombrable: this.esRenombrable,
      esMovible: this.esMovible,
      esAnidable: this.esAnidable,
      items: this.items.map((item) =>
        "serializar" in item ? item.serializar() : item
      ),
      orden: this.orden,
      padreId: this.padreId,
      fechaCreacion: this.fechaCreacion.toISOString(),
      fechaModificacion: this.fechaModificacion.toISOString(),
      creadoPor: this.creadoPor,
      modificadoPor: this.modificadoPor,
    });
  }

  agregarItem(item: RecursoTrotaBase | CarpetaTrota): void {
    if (this.items.some((existingItem) => existingItem.id === item.id)) {
      console.warn(`Item con ID ${item.id} ya existe en la carpeta`);
      return;
    }
    this.items.push(item);
    this.actualizarFechaModificacion();
    this.onItemAgregado?.(item);
    this.onEstructuraCambiada?.();
  }
  eliminarItem(itemId: string): boolean {
    const index = this.items.findIndex((item) => item.id === itemId);
    if (index > -1) {
      this.items.splice(index, 1);
      this.actualizarFechaModificacion();
      this.onItemEliminado?.(itemId);
      this.onEstructuraCambiada?.();
      return true;
    }
    return false;
  }

  private actualizarFechaModificacion(): void {
    this.fechaModificacion = new Date();
  }
  constructor(initialData?: Partial<CarpetaTrota>) {
    Object.assign(this, initialData);
  }

  onItemAgregado?: (item: RecursoTrotaBase | CarpetaTrota) => void;
  onItemEliminado?: (itemId: string) => void;
  onEstructuraCambiada?: () => void;
}

// Factory para crear carpetas
export class CarpetaFactory {
  private static getConfigSistema(): Record<string, Partial<CarpetaTrota>> {
    return {
      "Accesos": {
        icono: "language",
        iconoAbierto: "captive_portal",
      },
      "Finanzas": {
        items: [
          this.crearCarpetaUsuario("Creditos"),
          this.crearCarpetaUsuario("Historial"),
        ],
      },
      "Recursos": {
        items: [
          RecursoFactory.crearRecurso("informacion-alfa-v1"),
        ],
      },
    };
  }

  static crearCarpetaSistema(nombre: string): CarpetaTrota {
    const config = this.getConfigSistema()[nombre] || {};

    return new CarpetaTrotaImpl({
      id: `carpeta-${nombre.toLowerCase()}-sistema`,
      nombre,
      tipo: "sistema" as const,
      esEliminable: false,
      esRenombrable: false,
      esMovible: false,
      creadoPor: "sistema",
      ...config,
    });
  }

  static crearCarpetaUsuario(
    nombre: string,
    items: (RecursoTrotaBase | CarpetaTrota)[] = [],
  ): CarpetaTrota {
    return new CarpetaTrotaImpl({
      id: `user-${crypto.randomUUID()}`,
      nombre,
      tipo: "usuario",
      icono: "folder",
      esEliminable: true,
      esRenombrable: true,
      creadoPor: "usuario",
      items,
    });
  }
}
