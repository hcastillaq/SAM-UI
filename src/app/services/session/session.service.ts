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
   * service.rolAccess(["admin", "superAdmin"]) - Verifica que el rol del usuario activo
   * se encuentre en el arreglo de accesos validos
   * @param { Array } access - arreglo  de accesos validos
   * @return { Boolean }
   */
  access(access: Array<String>): Boolean {
    const rol = this.getUser().rol;
    let state = access.includes(rol);
    return state;
  }

  logout() {
    this.jwt.destroyToken();
  }
}
