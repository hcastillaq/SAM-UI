import { Injectable } from "@angular/core";
import * as tokenDecode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class JwtService {
  constructor() {}
  /**
   * Función encargada de devolver el token almacenado en el localStorage.
   *
   * @return Retorna un `String` que corresponde al token actual.
   */
  getToken(): String {
    return window.localStorage["jwtToken"];
  }

  /**
   * Función encargada de almacenar el jwtToken en el localStorage.
   * @param {jwtToken} Token a almacenar.
   *
   * @return {void}
   */
  saveToken(jwtToken: String): void {
    window.localStorage["jwtToken"] = jwtToken;
  }

  /**
   * Función encargada de eliminar el jwtToken almacenado en el localStorage
   *
   * @return {void}
   */
  destroyToken(): void {
    window.localStorage.removeItem("jwtToken");
  }

  /**
   * Función encargada de decodificar el jwtToken.
   * @param {jwtToken} Token a decodificar.
   *
   * @return {Object} Object
   */
  decodeToken(jwtToken: String): any {
    return tokenDecode(jwtToken);
  }

  /**
   * Valida si un token ya esta expirado, retorna true o false
   * @param {Number} exp
   * @return {boolean}
   */
  verifyExpToken(exp: number): boolean {
    try {
      if (Date.now() >= exp * 1000) {
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }

  /**
   * Retorna el objecto contenido en el token
   * @return  { Object }
   */
  getObjectToken(): any | null {
    const token = this.getToken();
    if (token === null || token === undefined) return null;
    return this.decodeToken(token);
  }
}
