# Sistema de Gestión Escolar - Colegio Bernardo O'Higgins (Frontend)

Este proyecto corresponde a la interfaz de usuario para el sistema de gestión académica, desarrollada con React y Vite, siguiendo estándares profesionales de arquitectura limpia y patrones de diseño.

## preparar el entorno

Primero iniciamos la terminal y comprobamos si tenemos instalado node y pnpm (se recomienda Node v18+):

Bash

```
node -v 
pnpm -v
```

en caso de tenerlos instalados esto debería retornar algo similar a esto:

Bash

```
user@pop-os:~$ node -v
v18.19.1
user@pop-os:~$ pnpm -v
11.5.0
```

si no están instalados es necesario ejecutar (puedes habilitar pnpm mediante corepack):

Bash

```
sudo apt update 
sudo apt install nodejs
corepack enable pnpm
```

## configuración del proyecto

Una vez que tenemos el entorno listo, entramos a la carpeta del frontend y descargamos todas las librerías necesarias (React, MUI, Firebase, Axios, etc):

Bash

```
user@pop-os:~/Escritorio/FullStack_3/EV2/Frontend/front-gestion-escolar$ pnpm install
```

## ejecución del sistema

Para levantar el servidor de desarrollo y ver la aplicación funcionando, ejecutamos:

Bash

```
user@pop-os:~/Escritorio/FullStack_3/EV2/Frontend/front-gestion-escolar$ pnpm dev
```

Esto nos entregará una URL (usualmente `http://localhost:5173`) para abrir en el navegador.

---

# Documentación Técnica

Pilares técnicos del desarrollo:

### 1. Dimension: Patrones y Arquitectura

- **Patrones de Diseño Implementados:**
    
    - **Repository Pattern:** Centralizamos la comunicación en la capa de `infrastructure`. **Justificación:** Permite cambiar el proveedor de datos (BFF o Mock) sin afectar la lógica del negocio.
        
    - **Provider Pattern (Context API):** Gestión de roles y permisos. **Justificación:** Asegura la coherencia de seguridad en toda la app (Requisito 15).
        
    - **Styled Components (MUI System):** Separamos el estilo del JSX. **Justificación:** Mejora la mantenibilidad y legibilidad del código (Clean Code).
        
- **Patrón Arquitectónico:**
    
    - Se utiliza un **API Gateway (BFF)** para orquestar la comunicación con los microservicios, garantizando una solución **escalable y eficiente**.
        
    - La estructura de carpetas sigue **Clean Architecture**: `presentation` (UI), `application` (Casos de uso/validaciones) e `infrastructure` (APIs/Firebase).
        

### 2. Dimension: Estrategia de Branching (Gitflow)

- Implementamos una estrategia de **Gitflow** clara (main, develop, feature/).
    
- Existe evidencia de merges y resolución de conflictos documentada en los Pull Requests del repositorio. Esto favoreció la colaboración efectiva entre los integrantes del equipo.