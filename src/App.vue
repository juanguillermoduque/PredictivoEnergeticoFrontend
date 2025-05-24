<script setup>

</script>

<template>
  <div class="app">
    <nav class="main-nav">
      <router-link to="/" class="nav-logo">
        <img src="https://www.xm.com.co/sites/default/files/styles/large/public/2021-03/XM.png?itok=6YwOD3Be" alt="Logo" class="logo-img">
        <span class="logo-text">XM Analytics</span>
      </router-link>
      
      <div class="nav-links">
        <router-link to="/" class="nav-link">Inicio</router-link>
        <router-link to="/step-by-step" class="nav-link">Guía</router-link>
        <router-link to="/predict" class="nav-link">Predicciones</router-link>
        <router-link to="/visualize" class="nav-link">Visualizaciones</router-link>
      </div>
    </nav>
    
    <main class="main-content">
      <router-view></router-view>
    </main>
    
    <footer class="footer">
      <p>&copy; 2025ß XM Analytics. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<style>
/* Estilos globales */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}

/* Estilos de la aplicación */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-nav {
  background-color: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #2c3e50;
}

.logo-img {
  height: 40px;
  margin-right: 10px;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #666;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #4CAF50;
  background-color: #f8f9fa;
}

.router-link-active {
  color: #4CAF50;
  font-weight: bold;
}

.main-content {
  flex: 1;
  padding: 2rem;
}

.footer {
  background-color: #2c3e50;
  color: #fff;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>
