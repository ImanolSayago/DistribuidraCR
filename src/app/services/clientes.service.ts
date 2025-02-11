import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray } from 'rxjs';
import { cliente } from '../Interface/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  http = inject(HttpClient);
  apiURL= "http://localhost:8080/clientes"
  constructor() { }

  getClientes ():Observable<cliente[]>
  {
    const url = `${this.apiURL}/traer`
    return this.http.get<cliente[]>(url);
  }

  addCliente(cli: cliente):Observable<cliente>
  {
    const url = "http://localhost:8080/clientes/agregar"
    return this.http.post<cliente>(url,cli);
  }

  deleteCliente(id:number):Observable<void>
  {
    const url = `${this.apiURL}/eliminar/${id}`;
    return this.http.delete<void>(url);
  }

}
