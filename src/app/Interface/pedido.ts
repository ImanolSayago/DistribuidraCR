import { DetallePedido } from "./DetallePedido";

export interface pedido {
    id?: number;
    clienteId: number;
    descripcion: string;
    estado: string;
    fecha: string; // Se maneja como string en JSON
    detalles: DetallePedido[];
  }