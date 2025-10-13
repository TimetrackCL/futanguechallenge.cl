# Futangue Challenge - Website

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js instalado

### Instalación

```bash
npm install
```

## 📜 Scripts Disponibles

### Desarrollo con Live Reload (Recomendado)
```bash
npm start
```
Inicia el servidor en http://localhost:3000 con:
- ✅ Compilación automática de SCSS a CSS
- ✅ Live reload del navegador
- ✅ Observación de cambios en HTML y SCSS

### Solo Watch (sin servidor)
```bash
npm run dev
```
Compila SCSS y observa cambios sin servidor

### Compilar SCSS una vez
```bash
npm run sass
```

### Compilar SCSS + Minificado
```bash
npm run build
```
Genera archivos CSS normales y minificados

### Solo Minificado
```bash
npm run sass:min
```

## 📁 Estructura de Archivos

```
assets/
  css/
    index.scss      ← Edita este archivo
    index.css       ← Generado automáticamente
    index.css.map   ← Source map
```

## ⚙️ Configuración de Gulp

El proyecto usa:
- **Gulp 4**: Automatización de tareas
- **SASS/SCSS**: Preprocesador CSS
- **BrowserSync**: Live reload
- **Autoprefixer**: Prefijos CSS automáticos
- **CleanCSS**: Minificación

## 🔧 Solución de Problemas

### Error: "scripts is disabled"
Si aparece este error en PowerShell:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
```

### Puerto 3000 ocupado
Edita `gulpfile.js` línea 91 para cambiar el puerto:
```javascript
port: 3000  // Cambia a otro puerto
```

## 📝 Flujo de Trabajo

1. **Inicia el servidor**: `npm start`
2. **Edita** `assets/css/index.scss`
3. **Los cambios se reflejan automáticamente** en el navegador
4. **Antes de producción**: `npm run build` para generar archivos minificados

---

**Desarrollado para Futangue Challenge** 🏃‍♂️⛰️

