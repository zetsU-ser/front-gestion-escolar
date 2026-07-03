import { useMutation } from '@tanstack/react-query';
import { useDependencies } from '../context/DependencyContext';

// CUSTOM HOOK
// maneja la lógica de mensajeria
export const useMensajeria = () => {
  const { mensajeRepository } = useDependencies();
  const enviarMutation = useMutation({
    mutationFn: async (payload) => {
      const { destinatarios, asunto, cuerpo_mensaje } = payload;
      
      // Ejecutamos el envío en segundo plano sin bloquear el retorno de la mutación
      // Esto libera la interfaz de usuario de inmediato
      (async () => {
        const batchSize = 15;
        let enviosExitosos = 0;
        let enviosFallidos = 0;

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
        console.log(`[Envío en Segundo Plano] Finalizado. Exitosos: ${enviosExitosos}, Fallidos: ${enviosFallidos}`);
      })();

      // Retornamos de inmediato para que la UI se desbloquee
      return { 
        success: true, 
        message: `Se inició el envío de ${destinatarios.length} mensajes en segundo plano.` 
      };
    }
  });

  // ejecuta la acción asíncrona de enviarMensaje
  const enviarMensaje = async (payload) => {
    return await enviarMutation.mutateAsync(payload);
  };

  return { enviarMensaje, loading: enviarMutation.isPending || enviarMutation.isLoading };
};
