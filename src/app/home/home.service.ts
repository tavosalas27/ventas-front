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
   * @description: Obtiene la lista de los estados
   */
   public getEstados(): Observable<any> {
    return this.http.get(`${this.url}/lista-estados`)
  }

  /**
   * @description: Obtiene la lista de las categorias existentes
   */
  public getCategorias(): Observable<any> {
    return this.http.get(`${this.url}/lista-categorias`)
  }

  /**
   * @description: Obtiene la lista de las categorias existentes para configuracion
   */
  public getCategoriasConf(): Observable<any> {
    return this.http.get(`${this.url}/lista-categorias-conf`)
  }

  /**
   * @description: Obtiene la lista de los productos segun la categoria
   */
  public getProductoCategoria(id:number): Observable<any> {
    return this.http.get(`${this.url}/producto-categoria/${id}`)
  }

  /**
   * @description: Crea una nueva categoria
   */
  public crearCategoria(datos: any): Observable<any> {
    let ruta = this.url + '/crear-categoria'
    return this.http.post(ruta, datos);
  }

  /**
   * @description: Actualizar una categoria
   */
  public actualizarCategoria(id:number, datos: any): Observable<any> {
    let ruta = this.url + '/actualizar-categoria/' + id;
    return this.http.put(ruta, datos);
  }

  /**
   * @description: Actualizar una categoria
   */
  public eliminarCategoria(id:number, datos: any): Observable<any> {
    let ruta = this.url + '/borrar-categoria/' + id;
    return this.http.put(ruta, datos);
  }
}
