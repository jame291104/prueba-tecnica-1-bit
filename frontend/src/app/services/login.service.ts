import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Credenciales } from '../interfaces/credenciales';
import { jwtDecode } from 'jwt-decode';  // Importación correcta

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly URL_LOGIN = 'http://localhost:9000/login';
  private readonly URL_REGISTER = 'http://localhost:9000/usuarios/crear';  // URL de registro

  constructor(
    private _httpClient: HttpClient
  ) {}

  // Iniciar sesión
  inicioSesion(credencialesIngreso: Credenciales): Observable<any> {
    return this._httpClient.post(this.URL_LOGIN, credencialesIngreso);
  }

  // Registrar usuario
  registroUsuario(usuario: { username: string; email: string; password: string }): Observable<any> {
    return this._httpClient.post(this.URL_REGISTER, usuario);
  }

  // Obtener el token
  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  // Redirigir dependiendo del rol
  redireccionar(): void {
      alert("LOGUEADO!!")
  }

  // Verificar si está logueado
  estaLogueado(): boolean {
    return !!this.obtenerToken();
  }

  // Cerrar sesión
  cierreSesion(): void {
    localStorage.removeItem('token');
    alert("BYE AMIG@")
  }
}
