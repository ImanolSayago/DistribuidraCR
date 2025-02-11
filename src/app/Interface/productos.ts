import { categoria } from "./categoria";

export interface productos{
        id?: number;
        nombre: string;
        precio: number;
        stock: number;
        categoriaNombre:string;
    }