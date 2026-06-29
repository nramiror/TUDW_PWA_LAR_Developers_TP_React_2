![Logo REACT-GAMES](public/Logo.png)

# REACT GAMES - Tu Ludoteca Digital

**🔗 [Acceder a la aplicación desplegada](https://tudw-pwa-lar-developers-tp-react-2.vercel.app/)**

## Programación Web Avanzada (TUDW)

- **Trabajo Práctico** REACT Parte II: Desarrollo de una Aplicación con Múltiples Páginas

**Integrantes:**
- Project Manager: Ramiro Navarrete — FAI-5522
- Developer: Linda Cristal Parra Sanhueza — FAI-5568
- Developer: Andrea Crespillo — FAI-5546


## Descripción

Aplicación web desarrollada con React y Vite que permite buscar, explorar y gestionar juegos de mesa mediante una API propia. Incluye autenticación de usuarios (Login/Register), gestión de favoritos persistente en base de datos, soporte de idiomas (es/en), scroll infinito y funcionalidades administrativas (CRUD).

## Características principales

- **Autenticación y Seguridad:** Sistema de Login/Registro con JWT y patrón de *Silent Refresh*.
- **Gestión de Favoritos:** Persistencia de juegos favoritos directamente en el backend.
- **Funcionalidades Admin:** Creación, edición y eliminación de juegos de mesa (CRUD) mediante interfaz protegida.
- **Internacionalización:** Selector de idioma dinámico (es/en) con i18next.
- **Exploración:** Listado con scroll infinito y vista detallada de ítems.

## Instalación y ejecución (paso a paso)

1. Clonar el repositorio:

```
git clone https://github.com/nramiror/TUDW_PWA_LAR_Developers_TP_React_2.git
cd TUDW_PWA_LAR_Developers_TP_React_2
```
2. Configurar variables de entorno:

```
Crear un archivo `.env` en la raíz siguiendo el ejemplo `.env.example`:
VITE_API_URL="https://api.tu-servidor.com"
```

3. Instalar dependencias:

```
npm install
```

4. Ejecutar en modo desarrollo (Vite):

```
npm run dev
```

## Testing

Los tests están desarrollados con **Vitest** y **React Testing Library**. Para ver además el reporte de cobertura usamos el comando de coverage de Vitest.

### Ejecutar tests

**Modo watch** (se ejecutan automáticamente cuando cambias archivos):

```
npm test
```

**Ejecutar tests una sola vez:**

```
npm run test:run
```

**Ejecutar tests con coverage:**

```
npm run coverage
```

### Cobertura de tests

El proyecto incluye tests para:
- **Componentes** (Header, Footer, Card, Button, Alert, etc.)
- **Custom Hooks** (useInfiniteScroll, useFavoriteGames, useLanguagePreference, useLocalStorage)
- **Utilidades** (favoriteUtils, homeUtils, idUtils, searchNavigation)

**Reporte actual:**
![Testing](public/TestingCov.png)

## Capturas de pantalla
Home.
![Home](public/Home.png)
Favorites.
![Favorites](public/Fav.png)
Detail.
![Detalle](public/ItemDetail.png)
NotFound.
![NotFound](public/NotFound.png)

## Estructura relevante del proyecto

**Archivos principales:**
- `src/App.jsx` : componente raíz, maneja routing y estado global de la app
- `src/main.jsx` : punto de entrada de la aplicación
- `src/index.css` : estilos globales de la aplicación
- `src/i18n.js` : configuración de internacionalización con i18next
- `src/context/AuthContext.jsx` : manejo de sesión de usuario.
- `src/utils/fetchInterceptor.js` : gestión de requests autenticados.

**Carpetas por funcionalidad:**
- `src/Pages/` : vistas principales (`Home`, `Favorites`, `ItemDetail`, `NotFound`)
- `src/Components/` : componentes reutilizables (Header, Footer, List, SearchBox, Card, Button, etc.)
- `src/services/` : servicios de comunicación con el backend (boardgames, favorites, user)
- `src/customHooks/` : hooks personalizados (`useFavoriteGames`, `useInfiniteScroll`, `useLanguagePreference`, `useLocalStorage`, `useBoardGameManager`)
- `src/utils/` : utilidades compartidas (formatters, interceptors, setupTest, etc).
- `src/locales/` : archivos de traducción (español e inglés)
  - `es/Translation.json` : textos en español
  - `en/Translation.json` : textos en inglés

## Tecnologías

- **Frontend:** React, Vite, Tailwind CSS.
- **Internacionalización:** i18next.
- **Autenticación:** JWT (JSON Web Tokens) con persistencia de tokens en `localStorage` (para refresh sessions).
- **Consumo API:** Fetch API con interceptores para cabeceras de autorización.

