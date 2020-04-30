import { ROL_ACCESS } from "./rols.helpers";

/**
 * All routes names in the system
 */
export const ROUTERS_LIST = {
  SUPER_ADMIN: {
    ACCESS: [ROL_ACCESS.SUPER_ADMIN],
    ROOT: "spadmin",
  },
  ADMIN: {
    ACCESS: [ROL_ACCESS.ADMIN],
    ROOT: "admin",
  },
  AUTH: {
    ROOT: "auth",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
};

/**
 *  Retorna la url del modulo al que el usuario activo deberia ir
 * @param { Number } rol - rol del usuario, es un numero
 * @return { String }
 */
export function GO_ROL_HOME(rol: Number): string {
  let pathName = "";
  Object.keys(ROL_ACCESS).forEach((key) => {
    if (ROL_ACCESS[`${key}`] === rol) {
      pathName = key;
    }
  });
  return "/" + ROUTERS_LIST[`${pathName}`].ROOT;
}
