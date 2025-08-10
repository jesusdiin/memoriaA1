# 🧠🧍‍♂️ memoriaA1

¡Bienvenido a memoriaA1, el memorama más legendario y unificador de Fb!  
Este no es un simple juego de memoria. Es un viaje espiritual por los arquetipos del Trujillo moderno.

---

## 🎮 ¿Qué es esto?

Un **juego web** donde los jugadores deben hacer match entre diferentes tipos de Trujillos (sí, el gato y sus variantes).  
Pero eso no es todo: puedes **iniciar sesión con Facebook**, guardar tu tiempo y competir por el **mejor ranking de Trujillos**. 

> "Ya unificalas magazo" – Algún sabio.

---

## 🔗 Comunidad y Origen

Este juego nace el el grupo de nombre largo, originalmente creado por **Pitufillo** :

- 🌐 Página oficial: [El Nombre Largote](https://www.facebook.com/PaginaDelNombreLargote)
- 💬 Comunidad de Trujillos: [Grupo de Facebook](https://www.facebook.com/groups/2653690301563618)

¿No estás en el grupo? Entonces eres un lavapollos

---

## ✨ Características para la versión 3?

- 🔄 Login con Facebook (OAuth2)
- 🧍‍♂️ Perfil sincronizado con FB
- 🧠 Guardado de puntajes en PostgreSQL
- 🏆 Ranking de Trujillos más veloces
- 🎨 Diseño chido
- ☁️ Backend desplegable en cualquier nube

---

## 🧰 Tecnologías

| Frontend        | Backend          | Base de datos  |
|-----------------|------------------|----------------|
| HTML, CSS, JS   | Node.js + Express| PostgreSQL     |
| (estático)      | Passport + JWT   | Prisma ORM     |

---

## 🚀 Instalación Local

### 🖥️ Requisitos

- Node.js
- PostgreSQL
- Facebook App (ver sección de configuración)

### 🧪 Clonar y correr

```bash
git clone https://github.com/IRVIN-A1/memoriaA1.git
cd memoriaA1

# Instalar dependencias del backend
cd backend
npm install

# Configurar la base de datos
npx prisma migrate dev

# Correr backend
npm run dev
