import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url ='http://localhost:8000/api'

  constructor(private http: HttpClient) { }

  /**
   * @description: Obtiene el usuario segun las credenciales
   */
  public getUsuario(user:string, password:string): Observable<any> {
    return this.http.get(`${this.url}/login/${user}/${password}`)
  }
}
