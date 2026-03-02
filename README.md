# ChatApp - TP Final Frontend

## Descripción

Esta aplicación es un clon simplificado de una aplicación de mensajería (tipo WhatsApp) desarrollada como trabajo final para el curso de Frontend. Permite a los usuarios "iniciar sesión" (simulado), ver una lista de chats, buscar conversaciones y enviar mensajes en tiempo real (estado local).

## Tecnologías Utilizadas

- **React**: Librería principal para la construcción de la interfaz.
- **React Router DOM**: Para el manejo de rutas y navegación (SPA).
- **Tailwind CSS**: Para el estilizado rápido y responsivo.
- **Context API**: Para el manejo del estado global de autenticación.
- **Lucide React**: Para los iconos.
- **Vite**: Como empaquetador y servidor de desarrollo.

## IA Utilizada

- **Claude**: Utilice esta IA para evitar y corregir malas practicas, errores, dudas, y lograr el resultado de la consigna.

## Funcionalidades

1. **Login**: Ingreso de nombre de usuario para personalizar la experiencia.
2. **Lista de Chats**: Visualización de conversaciones con indicador de mensajes no leídos.
3. **Búsqueda**: Filtrado de chats en tiempo real usando parámetros de búsqueda en la URL (`?filter=...`).
4. **Chat**: Interfaz de mensajería con soporte para enviar mensajes.
5. **Diseño Responsivo**:
   - **Móvil**: Navegación fluida entre lista y detalle.
   - **Escritorio**: Diseño de dos columnas (lista a la izquierda, chat a la derecha).

## Dificultades y Soluciones

- **Manejo de rutas en móvil vs escritorio**: Se resolvió creando dos vistas principales (`HomePage` y `ChatPage`) que adaptan la visibilidad de los componentes (`ChatList` y `ChatWindow`) mediante clases de utilidad de Tailwind (`hidden md:block`, etc.).
- **Persistencia de datos**: Se utilizó `localStorage` para mantener la sesión del usuario activa al recargar la página.

## Tiempo de Desarrollo

- **Total**: 32 horas, 22 minutos y 45 segundos.

## Instalación y Ejecución

1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Ejecutar `npm run dev` para iniciar el servidor de desarrollo.

## Autor

Valentino Arellano

## Fecha

24/02/2026
