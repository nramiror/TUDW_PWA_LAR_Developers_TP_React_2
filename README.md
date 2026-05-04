# Programación Web Avanzada (TUDW)

- **Trabajo Práctico** REACT Parte II: Desarrollo de una Aplicación con Múltiples Páginas
- **Integrantes:**
	- Project Manager: Ramiro Navarrete — FAI-5522
	- Developer: Linda Cristal Parra Sanhueza — FAI-5568
	- Developer: Andrea Crespillo — FAI-5546


## Descripción

Aplicación web progresiva (PWA) desarrollada con React y Vite que permite buscar, explorar y marcar juegos de mesa como favoritos. Incluye soporte de idiomas (es/en), scroll infinito y detalle de ítems.

## Características principales

- Búsqueda de juegos
- Listado con scroll infinito
- Favoritos persistentes en `localStorage`
- Vista detallada de un juego
- Selector de idioma (es / en)

## Instalación y ejecución (paso a paso)

1. Clonar el repositorio:

```
git clone https://github.com/nramiror/TUDW_PWA_LAR_Developers_TP_React_2.git
cd TUDW_PWA_LAR_Developers_TP_React_2
```

2. Instalar dependencias:

```
npm install
```

3. Ejecutar en modo desarrollo (Vite):

```
npm run dev
```

4. Construir versión de producción:

```
npm run build
```

## Capturas de pantalla

![Home](public/Home.png)
![Favorites](public/Fav.png)
![Detalle](public/ItemDetail.png)

## Estructura relevante del proyecto

- `src/Pages/` : vistas principales (`Home`, `Favorites`, `ItemDetail`, `NotFound`)
- `src/Components/` : componentes reutilizables (Header, Footer, List, SearchBox, etc.)
- `src/services/boardgames.js` : llamadas a la API / lógica de datos
- `src/customHooks/` : hooks personalizados (`useFavoriteGames`, `useInfiniteScroll`, etc.)


## Tecnologías

- React
- Vite
- i18next
- ESLint
- LocalStorage para favoritos

