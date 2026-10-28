# Disney Universe

**Catálogo y trivial interactivo de personajes Disney**

Proyecto grupal del **bootcamp Full Stack — Grupo 1**.

**Integrantes:** Ainara · Andrés Felipe · Carmen · Jon Mikel

## Descripción

Disney Universe es una aplicación web multipágina para explorar personajes del universo Disney y poner a prueba los conocimientos sobre ellos. Permite consultar un catálogo, buscar y filtrar personajes por **nombre, películas y videojuegos**, ordenarlos alfabéticamente (**A-Z / Z-A**), guardar favoritos y jugar a un **trivial de identificación de personajes por imagen**.

El trivial consta de una serie de **preguntas con respuestas de opción múltiple** y muestra la puntuación obtenida al terminar la partida.

## Tecnologías y API

- **HTML5:** estructura de las páginas.
- **CSS3:** diseño y presentación visual.
- **JavaScript (vanilla, módulos ES):** lógica de la aplicación, interacción con el DOM y navegación.
- **JSON:** formato de intercambio de datos.
- **Disney API:** obtención de los datos de personajes Disney mediante peticiones asíncronas con `fetch`.
- **localStorage:** persistencia de personajes favoritos entre sesiones.
- **Git:** control de versiones y trabajo colaborativo.

La aplicación funciona en el navegador, sin backend propio ni base de datos relacional externa.

## Instalación y ejecución local

Disney Universe está desarrollado con HTML, CSS y JavaScript, por lo que **no requiere instalar dependencias del proyecto ni configurar una base de datos**.

Para ejecutarlo localmente:

1. Descarga el repositorio o clónalo desde GitHub.
2. Abre la carpeta del proyecto en **Visual Studio Code**.
3. Abre el archivo `index.html` con la extensión **Live Server** (por ejemplo, mediante la opción *Open with Live Server*).
4. La aplicación se abrirá en el navegador desde una dirección local.

**Requisitos:** un navegador moderno, un servidor HTTP local como Live Server y conexión a Internet para consultar Disney API.

> **Nota:** se recomienda utilizar un servidor local en lugar de abrir `index.html` directamente como archivo, ya que la aplicación emplea módulos JavaScript (`import`/`export`).

## Guía rápida de uso

### Explorar el catálogo

Entra en el catálogo para consultar las tarjetas de personajes. Utiliza la **paginación**, los **filtros por nombre, películas o videojuegos** y la **ordenación A-Z / Z-A** para explorar los resultados.

### Gestionar favoritos

Marca o desmarca personajes como favoritos y consulta la vista de **Favoritos**. Los favoritos se conservan en el navegador mediante `localStorage`.

### Jugar al Trivial

Accede a **Jugar** desde la página de inicio. Identifica al personaje que aparece en la imagen eligiendo entre las opciones disponibles. Tras responder a las preguntas, la aplicación muestra tu **puntuación final**.

## Organización general del código

El proyecto separa sus responsabilidades dentro de `src/`:

| Carpeta | Función principal |
| --- | --- |
| `api/` y `utils/` | Configuración, peticiones y funciones auxiliares. |
| `core/` | Modelos y lógica del catálogo, favoritos y trivial. |
| `ui/` | Renderizado de componentes en el DOM. |
| `html/` | Páginas secundarias de la aplicación. |
| `css/` | Hojas de estilo por vista. |
| `img/` y `media/` | Recursos visuales y multimedia. |

## Alcance y limitaciones

Esta versión **no incluye** cuentas de usuario con autenticación real, ranking persistente de jugadores, fichas individuales ampliadas ni sincronización de favoritos entre dispositivos. Los favoritos se almacenan localmente en el navegador.

## Documentación técnica

La **Memoria Técnica de Disney Universe** amplía la descripción de la arquitectura, el modelo de clases, el flujo de datos, las decisiones de diseño UI/UX, el reparto de tareas y los desafíos del desarrollo colaborativo.

## Posibles mejoras

- Añadir pruebas automatizadas para el trivial y el tratamiento de datos de la API.
- Incorporar temporizador y niveles de dificultad al juego.
- Mejorar las transiciones y los indicadores de carga durante las consultas.

---

*Proyecto académico desarrollado por el Grupo 1 del bootcamp Full Stack.*
