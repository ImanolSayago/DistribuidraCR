import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {pedido } from '../Interface/pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor() { }

  http = inject(HttpClient);
  apiURL = "https://www.crdistribuidora.com/pedidos";

  addPedidos(pedido: pedido):Observable<pedido>
  {
    const url = `${this.apiURL}/crear`;
    return this.http.post<pedido>(url,pedido);
    
  }

  traerPedidos():Observable<pedido[]>{
    const url = `${this.apiURL}/traer`;
    return this.http.get<pedido[]>(url);
  }

  traerPedidoPorID(id:number):Observable<pedido>{
    const url = `${this.apiURL}/traer/${id}`;
    return this.http.get<pedido>(url);
  }

  deletePedido(id:number):Observable<pedido>{
    const url = `${this.apiURL}/eliminar/${id}`;
    return this.http.delete<pedido>(url);
  }

  actualizarEstado(id: number, estado: string): Observable<pedido> {
    const url = `${this.apiURL}/actualizar/${id}`;
    const params = new HttpParams().set('estado', 'entregado'); // Establece el parámetro 'estado'
  
    return this.http.put<pedido>(url, null, { params }); // Envíalo con los parámetros
  }
}
