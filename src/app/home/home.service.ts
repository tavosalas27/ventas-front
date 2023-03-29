import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url ='http://localhost:8000/api'

  constructor(private http: HttpClient) { }

  /**
   * @description: Obtiene la lista de los productos existentes
   */
  public getProductos(): Observable<any> {
    return this.http.get(`${this.url}/lista-productos`)
  }

  /**
   * @description: Obtiene la lista de las categorias existentes
   */
  public getCategorias(): Observable<any> {
    return this.http.get(`${this.url}/lista-categorias`)
  }

  /**
   * @description: Obtiene la lista de los productos segun la categoria
   */
  public getProductoCategoria(id:number): Observable<any> {
    return this.http.get(`${this.url}/producto-categoria/${id}`)
  }
}