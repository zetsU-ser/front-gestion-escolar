/**
 * Interfaz para el repositorio de autenticación
 */
export class AuthRepository {
  /**
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<any>}
   */
  // eslint-disable-next-line no-unused-vars
  async login(email, password) {
    throw new Error('Not implemented');
  }

  /**
   * @returns {Promise<void>}
   */
  async logout() {
    throw new Error('Not implemented');
  }
}
