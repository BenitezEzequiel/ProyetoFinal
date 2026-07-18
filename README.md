# LAVERO H&L Premium Detailing

Proyecto final para el curso de **Desarrollo Web**: un e-commerce/landing para un lavadero de autos de alta gama, con catálogo dinámico, carrito y formulario de contacto.

## Tecnologías
- **HTML5 semántico** (header, main, footer y secciones)
- **Bootstrap 5** (UI base + modal del carrito)
- **CSS** con variables y estilos premium (hero con background, Flexbox y Grid)
- **JavaScript**:
  - Carga de servicios desde `servicios.json` (Fetch)
  - Renderizado dinámico
  - Carrito con persistencia en **LocalStorage**
  - Validación básica del formulario

## Estructura de archivos
- `index.html`: estructura principal y modal del carrito
- `style.css`: estilos del sitio (hero, tarjetas, reseñas, carrito)
- `script.js`: lógica de carga/DOM y carrito
- `servicios.json`: catálogo de servicios (id, nombre, precio, imagen, descripción)
- `README.md`: documentación

## Cómo usar
1. Abrir `index.html` en el navegador.
2. Consultar la sección **Servicios** y agregar al carrito.
3. Confirmar reserva (simulación) desde el modal.
4. En **Reserva tu turno**, completar el formulario (Formspree).

## Despliegue
Este proyecto puede desplegarse en **GitHub Pages** (o cualquier host estático):
1. Subir el repositorio.
2. Ir a **Settings → Pages** y habilitar **GitHub Pages**.

## Repositorio
- https://github.com/BenitezEzequiel/ProyetoFinal

