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
    LOGIN: "login",
    REGISTER: "register",
    LOGOUT: "logout",
  },
};
