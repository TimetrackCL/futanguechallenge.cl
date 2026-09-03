# Futangue Challenge — Sitio 2027

Landing estática de la edición 2027, reimplementada a partir del diseño
**"Futangue Landing 2027"** (Claude Design, proyecto `Rediseño Futangue Challenge 2027`).

Sin build: HTML, CSS y JS planos. Se publica tal cual está el repositorio.

## 🚀 Desarrollo

```bash
npm install
npm start          # http://localhost:3000 con live reload
```

BrowserSync sirve la raíz y recarga ante cambios en `index.html` y `assets/**`.
Cualquier servidor estático sirve igual (`python3 -m http.server`, `npx serve`, etc.).

## 📁 Estructura

```
index.html
assets/
  css/main.css             ← estilos completos del sitio
  js/main.js               ← header al hacer scroll, menú móvil, lightbox de mapas
  img/
    logofutangue.png       ← logo (header y footer)
    favicon/               ← hojita.svg · hojita.png
    hero/                  ← hero-banner.webp (+ .jpg fallback) · foto-web.jpg
    circuits/2027/         ← mapas que abre el lightbox
    sponsors/              ← 7 logos SVG
```

## 🎨 Sistema visual

| Token | Valor | Uso |
|---|---|---|
| `--cream` | `#f3f0e6` | fondo base |
| `--ink` | `#273337` | texto y secciones oscuras |
| `--yellow` | `#d8ca00` | acento / CTA |
| `--green` | `#576c5a` | panel de kit, textos secundarios |
| `--sage` | `#95a596` | texto sobre fondo oscuro |

Tipografías: **Barlow Condensed** (títulos) y **Barlow** (texto), desde Google Fonts.
Breakpoint móvil: **900px**.

## 🔌 Integraciones

- **Inscripciones:** iframe de efluj con auto-resize (`https://efluj.com/embed.js`).
  El script va junto al iframe, no en el `<head>`.
- **Mapa:** embed de Google Maps en la sección "Cómo llegar".
- **Mapas de circuito:** lightbox nativo con `<dialog>`, sin librerías.

## ⚠️ Pendientes antes de publicar

- Guía técnica 2027: el botón está deshabilitado hasta tener el PDF.
- Confirmar la URL de reglamento del evento 2027 en efluj
  (`.../futangue-challenge-by-asics-2027/terms`, deducida por analogía).
- Los tickets de efluj están en estado "Próximamente": se ven los precios pero no se puede comprar.
- Falta analítica: el sitio anterior usaba Universal Analytics, discontinuado por Google en 2023.
- `foto-web.jpg` mide 678×756; queda justa para la sección 01 en pantallas retina.

---

**Desarrollado para Futangue Challenge** 🏃‍♂️⛰️
