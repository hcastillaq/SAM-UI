import { Injectable } from "@angular/core";
import { JwtService } from "../jwt/jwt.service";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  constructor(private jwt: JwtService) { }

  /**
   * Retornar el usuario activo
   */
  getUser(): any | null {
    const user = this.jwt.getObjectToken();
    return user ? user : null;
  }

  /**
   * Valida si una session existe y se encuentra activa
   * @return {boolean}
   */
  validate(): boolean {
    let valid = true;
    const token = this.jwt.getToken();
    if (!token) {
      valid = false;
    } else {
      valid = !this.jwt.verifyExpToken(this.jwt.decodeToken(token).exp);
    }
    return valid;
  }

  /**
   * @example
   * acessService.rolAccess([0,1,2]) - Verifica que el rol del usuario activo
   * se encuentre en el arreglo de accesos validos
   *
   * Valida si el usuario activo tiene acceso a lo que se requiera
   * @param { Array } access - arreglo  de accesos validos
   * @return { Boolean }
   */
  rolAccess(access): Boolean {
    const rol = this.getUser().rol.rol;
    let state = access.includes(rol);
    return state;
  }

  logout() {
    this.jwt.destroyToken();
  }
}
