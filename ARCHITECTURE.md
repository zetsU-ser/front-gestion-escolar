# Arquitectura del Proyecto: Sistema de Gestión Escolar (Frontend)

Este documento describe las directrices arquitectónicas, los patrones de diseño aplicados y las decisiones técnicas fundamentales que rigen el desarrollo y mantenimiento del frontend de esta aplicación, estructurada bajo los principios de **Clean Architecture** y **SOLID**.

## 1. Estructura de Carpetas

La aplicación está dividida en cuatro capas principales que garantizan la estricta separación de responsabilidades:

- **`domain/`**: Contiene la lógica de negocio pura y las entidades (modelos de datos). Esta capa no tiene dependencias de ningún framework externo (ni siquiera React). Define los contratos y las interfaces de los repositorios.
- **`infrastructure/`**: Implementa las interfaces definidas en el dominio. Aquí residen los clientes HTTP (Axios), la configuración de la API y los repositorios concretos (ej. `HttpUsuarioRepository`). Es la única capa que interactúa directamente con los servicios externos, siendo la encargada de mapear los errores de red hacia **Errores de Dominio** estandarizados.
- **`application/`**: Orquesta el flujo de la aplicación. Contiene los **Casos de Uso** (implementados como Custom Hooks) que consumen los repositorios para el acceso a datos. Aquí reside la Inyección de Dependencias a través de `DependencyContext` y el manejo puro del estado asíncrono del servidor utilizando TanStack Query.
- **`presentation/`**: Contiene toda la Interfaz de Usuario (UI). Subdividida en componentes compartidos (`shared`), enrutamiento (`routes`) y módulos funcionales (`modules`). Los componentes visuales consumen los datos e interacciones por medio de los **ViewModels**, aislando la lógica de renderizado de la lógica de presentación.

## 2. Flujo de Datos

El flujo de información sigue una dirección unidireccional estricta, desde la vista hasta la infraestructura, honrando la Regla de Dependencia de Clean Architecture:

1. **Interacción del Usuario (Componente UI)**: Un componente React (`View` o `Table`) recibe una interacción, como un clic en "Eliminar".
2. **Delegación a ViewModel (Presentation Layer)**: El componente delega la acción a su respectivo **ViewModel** (ej. `useAlumnosTableViewModel.js`). El ViewModel evalúa el flujo de la UI local, gatilla confirmaciones nativas (`window.confirm`), orquesta el estado de los modales y maneja notificaciones de error hacia la pantalla.
3. **Ejecución del Caso de Uso (Application Layer)**: El ViewModel invoca la mutación expuesta por el **Caso de Uso** (ej. `useAlumnos.js`). El Caso de Uso utiliza **TanStack Query** para gestionar transiciones, invalidaciones de caché, deduplicación de peticiones y previene condiciones de carrera, manteniéndose agnóstico de la vista.
4. **Inyección y Acceso a Datos (Infrastructure Layer)**: A través del `useDependencies()`, el Caso de Uso obtiene el Singleton del **Repository** inyectado por el `DependencyProvider`. El repositorio ejecuta la petición, envuelve las anomalías de `Axios`, lanza un Error de Dominio limpio y, de ser exitoso, retorna instancias puras del Modelo de Dominio hacia la capa superior.

## 3. Decisiones Técnicas Clave

- **Inversión de Dependencias (DIP) y Context API**: Los Casos de Uso jamás acoplan ni importan implementaciones concretas. Dependen enteramente del Inyector de Dependencias (`DependencyContext`), centralizando la instanciación de clases de infraestructura y habilitando un *testing* unitario robusto y aislado.
- **Abstracción Visual Estructural (`GenericTableModule`)**: Se abstrajo y eliminó el código visual duplicado mediante un contenedor central (`GenericTableModule`). Este garantiza uniformidad en toda la plataforma al renderizar encabezados de módulos, validaciones de permisos, divisores, alertas de infraestructura y *spinners* de estado, permitiendo que cada vista únicamente inyecte los componentes de filtrado y grilla.
- **Gestión Desacoplada del Estado de Servidor**: El `fetching` manual y el engorroso manejo de `useEffect` fueron reemplazados por completo gracias a React Query. Se maximiza el uso del caché persistido local, liberando de esta carga a los reductores o manejadores de estado de UI.
- **Optimización Algorítmica**: En operaciones repetitivas (cruces de datos masivos como `useAsistenciaViewModel`), se recurre consistentemente al uso de Diccionarios (Maps/Sets) combinados con `useMemo` para evitar bloqueos del hilo principal (evitando cuellos de botella algorítmicos) logrando que la aplicación mantenga los 60 FPS ininterrumpidos en sus renderizados.
- **Code Splitting Arquitectónico**: El enrutador (`App.jsx`) distribuye los *bundles* de los distintos módulos de manera perezosa mediante `React.lazy` y `Suspense`, bajando drásticamente los tiempos del First Contentful Paint.

---
*Este documento certifica las directrices técnicas obligatorias a seguir para preservar la robustez de la arquitectura. Cualquier modificación en los flujos de datos debe someterse bajo estas reglas formales.*
