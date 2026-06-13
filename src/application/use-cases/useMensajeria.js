import { useState } from 'react';

import axiosClient from '../../infrastructure/api/axiosClient';

export const useMensajeria = () => {
  const [loading, setLoading] = useState(false);

  const enviarMensaje = async (payload) => {
    setLoading(true);
    try {
      const { destinatarios, asunto, cuerpo_mensaje } = payload;
      
      // Enviamos el correo individualmente a la cola de ms-asistencia
      let enviosExitosos = 0;
      let enviosFallidos = 0;

      for (const dest of destinatarios) {
        try {
          await axiosClient.post('/mensaje', {
            alumnoId: Number(dest.alumnoId),
            profesorId: 1,
            destinatario: String(dest.correo),
            asunto: String(asunto),
            mensaje: String(cuerpo_mensaje),
            tipo: 'COMUNICACION'
          });
          enviosExitosos++;
        } catch (err) {
          console.error(`Error al enviar a ${dest.correo}:`, err);
          enviosFallidos++;
        }
      }
      
      if (enviosExitosos === 0 && enviosFallidos > 0) {
        throw new Error("El servidor de correo rechazó todos los mensajes. Verifique las direcciones de destino.");
      }

      return { 
        success: true, 
        message: `Se enviaron ${enviosExitosos} mensajes correctamente. Fallaron ${enviosFallidos}.` 
      };
    } finally {
      setLoading(false);
    }
  };

  return { enviarMensaje, loading };
};
