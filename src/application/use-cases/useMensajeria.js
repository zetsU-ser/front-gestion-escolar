import { useMutation } from '@tanstack/react-query';
import { useDependencies } from '../context/DependencyContext';

// CUSTOM HOOK
// maneja la lógica de mensajeria
export const useMensajeria = () => {
  const { mensajeRepository } = useDependencies();
  const enviarMutation = useMutation({
    mutationFn: async (payload) => {
      const { destinatarios, asunto, cuerpo_mensaje } = payload;
      
      // Enviamos el correo en lotes (batches) de 15 en paralelo para mejorar el rendimiento
      let enviosExitosos = 0;
      let enviosFallidos = 0;
      const batchSize = 15;

      for (let i = 0; i < destinatarios.length; i += batchSize) {
        const batch = destinatarios.slice(i, i + batchSize);
        await Promise.all(
          batch.map(async (dest) => {
            try {
              await mensajeRepository.enviar({
                alumnoId: Number(dest.alumnoId),
                profesorId: 1, // Podría venir de AuthContext en el futuro
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
          })
        );
      }
      
      if (enviosExitosos === 0 && enviosFallidos > 0) {
        throw new Error("El servidor de correo rechazó todos los mensajes. Verifique las direcciones de destino.");
      }

      return { 
        success: true, 
        message: `Se enviaron ${enviosExitosos} mensajes correctamente. Fallaron ${enviosFallidos}.` 
      };
    }
  });

  // ejecuta la acción asíncrona de enviarMensaje
  const enviarMensaje = async (payload) => {
    return await enviarMutation.mutateAsync(payload);
  };

  return { enviarMensaje, loading: enviarMutation.isPending || enviarMutation.isLoading };
};
