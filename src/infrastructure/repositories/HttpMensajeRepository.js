import axiosClient from '../api/axiosClient';
import { MensajeRepository } from '../../domain/repositories/MensajeRepository';

// REPOSITORY PATTERN
// gestiona las operaciones de datos para mensaje
class HttpMensajeRepository extends MensajeRepository {
  async enviar(mensajePayload) {
    const response = await axiosClient.post('/mensaje', mensajePayload);
    return response.data;
  }
}

// SINGLETON
export const mensajeRepository = new HttpMensajeRepository();
