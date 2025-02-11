import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoria } from '../Interface/categoria';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor() { }
  http= inject(HttpClient);
  private apiURL= "http://localhost:8080/categoria";

  getCategorias():Observable<categoria[]>
  {
    const url = `${this.apiURL}/traer`
    return this.http.get<categoria[]>(url);
  }
}
