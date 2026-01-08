# CURRICULUM_PROFESIONAL - Cloud Dashboard

Este repositorio contiene una plantilla de currículum profesional con diseño de "Dashboard Cloud (estilo Azure/AWS)", enfocada en mostrar logros, métricas e impacto de una manera visual y moderna.

## 🚀 Despliegue en GitHub Pages

Para publicar tu CV online de forma gratuita usando GitHub Pages:

1.  **Crea el repositorio en GitHub**:
    *   Ve a GitHub y crea un nuevo repositorio llamado `CURRICULUM_PROFESIONAL` (o el nombre que prefieras).
    *   Si quieres que la URL sea `tu-usuario.github.io`, llama al repositorio `tu-usuario.github.io`.

2.  **Sube los archivos**:
    *   Sube el contenido de esta carpeta (`index.html`, `assets/`, etc.) a tu nuevo repositorio.
    ```bash
    git init
    git add .
    git commit -m "Initial commit: CV Dashboard"
    git branch -M main
    git remote add origin https://github.com/TU_USUARIO/CURRICULUM_PROFESIONAL.git
    git push -u origin main
    ```

3.  **Activa GitHub Pages**:
    *   Ve a la pestaña **Settings** (Configuración) de tu repositorio.
    *   En el menú lateral izquierdo, busca la sección **Pages**.
    *   En **Source**, selecciona `Deploy from a branch`.
    *   En **Branch**, selecciona `main` y la carpeta `/ (root)`.
    *   Haz clic en **Save**.

4.  **¡Listo!**: En unos minutos, tu web estará disponible en la URL que GitHub te mostrará en esa misma página.

## 📝 Personalización del Contenido

El archivo principal es `index.html`. Debes editarlo para incluir tu información real. Busca los comentarios `<!-- USER: ... -->` para saber qué editar.

### Áreas Clave a Editar:

1.  **Métricas Principales**:
    *   Busca las tarjetas de "Años de Experiencia", "Proyectos Entregados" e "Impacto de Costes". Cambia los números por tus métricas reales (ej. "Reducción de latencia 200ms", "Ventas aumentadas 15%").

2.  **Activity Log (Logros)**:
    *   En la tabla de "Logros Recientes", edita las filas `<tr>` con tus proyectos más destacados.
    *   **Enfoque**: No pongas tareas ("Configuré servidores"), pon **resultados** ("Implementé auto-escalado reduciendo downtime un 99%").

3.  **Skills (Resource Health)**:
    *   Ajusta las barras de progreso y los nombres de las tecnologías en la sección de Skills.

4.  **Enlaces de Contacto**:
    *   Al final del archivo, actualiza los enlaces `href` de LinkedIn, Email y GitHub.

## 🎨 Personalización de Estilos

Si quieres cambiar los colores (por ejemplo, a un tema más claro o con otros acentos):
*   Edita `assets/css/style.css`.
*   Las variables de color están al principio en `:root`. Cambia `--accent-blue` o `--bg-dark` según tus preferencias.
