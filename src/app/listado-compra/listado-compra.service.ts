import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListadoCompraService {

  url ='http://localhost:8000/api'

  constructor(private http: HttpClient) { }

  /**
   * @description: Obtiene la lista de las compras del usuario
   */
  public getCompras(nombre:string): Observable<any> {
    return this.http.get(`${this.url}/compra-usuario/${nombre}`)
  }
}
