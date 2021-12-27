/**
 * Object with contain the all phrases and words for the app in user views
 */
export const DICTIONARY = {
  APP: {
    NAME: 'SFM',
  },
  AUTH: {
    PHRASE: '¡Bienvenido!',
    NOT_ACCOUNT: 'No tienes una cuenta?',
    CREATE_ACCOUNT: 'Click aquí para crearla',
    LOGOUT: 'Cerrar Session',
    REGISTER_PHRASE: 'Es hora de crear tu cuenta',
    TO_LOGIN: 'Tengo una cuenta',
    REGISTER: 'REGISTRAR CUENTA',
    LOGIN: 'INGRESAR',
  },
  FORMS: {
    PASSWORD: 'Contraseña',
    CONFIRM_PASSWORD: 'Confirmar Contraseña',
    EMAIL: 'Correo Electrónico',
    COMPANY: 'Nombre de tu compañía',
    REQUIRED: 'El campo es requerido',
  },
  SIDE_NAV: {
    HOME: 'Inicio',
    TRANSACTIONS: 'Transacciones',
    USERS: 'Usuarios',
    ANALYTICS: 'Analítica',
  },
  COMPANY: 'Compañía',
  ENTRY: 'Ingreso',
  INCOME: 'Ingresos',
  EXPENSE: 'Egreso',
  EXPENSES: 'Egresos',
  DESCRIPTION: 'Descripción',
  DATE: 'Fecha',
  MOUNT: 'Monto',
  mountFormat: 'Monto',
  TYPE: 'Tipo',
  TRANSACTIONS: 'Transacciones',
  SEARCH: 'Buscar',
};

export const TRANSLATE = (word: string): string => {
  const possibles = Object.keys(DICTIONARY).map((possible) =>
    possible.toLowerCase(),
  );
  if (
    typeof word === 'string' &&
    possibles.includes(word.toLowerCase().trim())
  ) {
    return (
      DICTIONARY[word.toLowerCase().trim()] ||
      DICTIONARY[word.toUpperCase().trim()] ||
      DICTIONARY[word.trim()]
    );
  } else {
    return word;
  }
};
