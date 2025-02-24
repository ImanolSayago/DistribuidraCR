import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productos } from '../Interface/productos';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor() { }
  http = inject(HttpClient);
  apiURL = "http://localhost:8080/productos"

  getProductos():Observable<productos[]>{
    const url= `${this.apiURL}/traer`;
    return this.http.get<productos[]>(url);
  }

  getProductoByID(id:number):Observable<productos>
  {
    const url = `${this.apiURL}/traer/${id}`;
    return this.http.get<productos>(url);
  }

  deleteProductoById(id: number):Observable<productos>
  {
    const url = `${this.apiURL}/eliminar/${id}`;
    return this.http.delete<productos>(url);
  }

  addProducto(pro:productos):Observable<productos>
  {
    const url = `${this.apiURL}/agregar`;
    return this.http.post<productos>(url,pro);

  }

  editProducto(producto: productos): Observable<productos> {
    const url = `${this.apiURL}/editar/${producto.id}`;
    return this.http.put<productos>(url, producto);
  }

  editStockProducto(id: number, stock: number): Observable<void> {
    const url = `${this.apiURL}/editarstock/${id}/${stock}`; // URL actualizada

    return this.http.put<void>(url, {}); // El segundo parametro es el body, como no envias nada, se envia un objeto vacio.
  }

 
}
