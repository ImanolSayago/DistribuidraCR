import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoria } from '../Interface/categoria';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor() { }
  http= inject(HttpClient);
  private apiURL= "https://www.crdistribuidora.com/categoria";

  getCategorias():Observable<categoria[]>
  {
    const url = `${this.apiURL}/traer`
    return this.http.get<categoria[]>(url);
  }

  addCategoria(cat: categoria):Observable<categoria>
  {
    const url = `${this.apiURL}/agregar`

    return this.http.post<categoria>(url,cat);
  }

  deleteCategoria(id:number):Observable<number>
  {
    const url = `${this.apiURL}/borrar/${id}`;
    return this.http.delete<number>(url);
  }
}
