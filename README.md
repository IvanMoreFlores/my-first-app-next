# Proyecto Next.js con Clean Architecture

Este proyecto implementa **Next.js 15+ con App Router**, siguiendo **Clean Architecture**.

## 🚀 Estructura de Carpetas

```
/MY-FIRST-APP-NEXT
│── /src
│   ├── /app
│   │   ├── /login
│   │   │   ├── page.tsx
│   │   │   ├── styles.css
│   │   │   ├── useLogin.ts
│   │   ├── /favicon.ico
│   │   ├── /globals.css
│   │   ├── /layout.tsx
│   │   ├── /page.tsx
│   ├── /application  # Casos de uso y lógica de negocio
│   │   ├── /useCases
│   │   │   ├── AuthCases.ts
│   │   ├── /services
│   │   │   ├── api.ts
│   ├── /domain  # Modelos y entidades
│   │   ├── /models
│   │   │   ├── Auth.ts
│   │   ├── /repositories
│   │   │   ├── AuthRepository.ts
│   ├── /infrastructure  # Implementaciones concretas
│   │   ├── /repositories
│   │   │   ├── AuthApi.ts
│   ├── /presentation  # Componentes de UI y páginas
│   │   ├── /components
│   │   │   ├── button
│   │   │   ├── info
│   │   │   ├── input
│   │   │   ├── label
│   │   │   ├── index.ts
│   │   ├── /hooks
│   │   ├── /state
│   ├── /test  # Pruebas unitarias y de integración
│   ├── /utils  # regex - number - date
│── /public
│── /styles
│── next.config.js
│── tsconfig.json
│── package.json
```

---

## 🏛️ ¿Qué es Clean Architecture?

Clean Architecture es un enfoque que separa las responsabilidades en diferentes capas para mejorar la mantenibilidad, escalabilidad y testabilidad del código. Se basa en la idea de que las reglas de negocio deben estar separadas de las implementaciones concretas, como la UI o las llamadas a APIs externas.

### 🔹 Capas en este proyecto:

1. **Domain (Dominio)**: Define las entidades y modelos de datos que representan la lógica del negocio.

   - `/models`: Contiene las estructuras de datos principales.
   - `/repositories`: Define las interfaces para acceder a los datos.

2. **Application (Aplicación)**: Implementa la lógica del negocio y los casos de uso.

   - `/useCases`: Define los casos de uso que ejecutan reglas de negocio.
   - `/services`: Conecta con APIs y otras fuentes de datos.

3. **Infrastructure (Infraestructura)**: Implementa las interfaces definidas en Domain.

   - `/repositories`: Contiene implementaciones concretas de acceso a datos.

4. **Presentation (Presentación)**: Contiene los componentes de UI y las páginas de la aplicación.

   - `/components`: Contiene componentes reutilizables.
   - `/hooks`: Contiene hooks personalizados.
   - `/state`: Puede incluir estados globales o gestión dagr

---

## ⚡ Instalación y Uso

1. Clona el repositorio:
   ```sh
   git clone https://github.com/IvanMoreFlores/my-first-app-next.git
   cd tu-repo
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Inicia el servidor en modo desarrollo:
   ```sh
   npm run dev
   ```

---

## 🚀 Subir un cambio a Git

Formato recomendado para mensajes de commit:
* feat: ➝ Nueva funcionalidad.
* fix: ➝ Corrección de errores.
* refactor: ➝ Mejora del código sin cambiar funcionalidad.
* docs: ➝ Cambios en la documentación.
* style: ➝ Cambios en formato, espacios, puntos y comas.
* test: ➝ Agregar o modificar pruebas.
* chore: ➝ Cambios menores o configuración.

---

## 🌟 Contribuciones

Si quieres mejorar el proyecto, ¡las PRs son bienvenidas! 🚀

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.