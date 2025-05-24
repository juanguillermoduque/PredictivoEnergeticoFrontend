<template>
  <div class="home-container">
    <header class="header">
      <h1>XM Analytics</h1>
      <p class="subtitle">Sistema de análisis y predicción de datos de XM</p>
    </header>
    
    <main class="main-content">
      <section class="features">
        <div class="feature-card" @click="$router.push('/step-by-step')">
          <i class="fas fa-book"></i>
          <h3>Guía Paso a Paso</h3>
          <p>Aprende a utilizar el sistema con nuestra guía detallada.</p>
          <button class="card-button">Ir a la Guía</button>
        </div>
        
        <div class="feature-card" @click="$router.push('/predict')">
          <i class="fas fa-chart-line"></i>
          <h3>Generar Predicciones</h3>
          <p>Utiliza nuestros modelos de machine learning para predecir datos.</p>
          <button class="card-button">Hacer Predicciones</button>
        </div>
        
        <div class="feature-card" @click="$router.push('/visualize')">
          <i class="fas fa-chart-pie"></i>
          <h3>Visualizaciones</h3>
          <p>Explora los datos con gráficos interactivos.</p>
          <button class="card-button">Ver Visualizaciones</button>
        </div>
      </section>
      
      <section class="quick-start">
        <h2>¿Cómo empezar?</h2>
        <ol>
          <li>Consulta la <router-link to="/step-by-step">Guía Paso a Paso</router-link> para entender el proceso.</li>
          <li>Genera predicciones usando diferentes modelos en la sección de <router-link to="/predict">Predicciones</router-link>.</li>
          <li>Explora los datos con las <router-link to="/visualize">Visualizaciones</router-link> interactivas.</li>
        </ol>
      </section>
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 0;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  border-radius: 10px;
  color: white;
}

.header h1 {
  font-size: 3em;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.subtitle {
  font-size: 1.2em;
  opacity: 0.9;
}

.main-content {
  padding: 20px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.feature-card {
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.feature-card i {
  font-size: 3em;
  color: #4CAF50;
  margin-bottom: 20px;
}

.feature-card h3 {
  margin-bottom: 15px;
  color: #2c3e50;
  font-size: 1.5em;
}

.feature-card p {
  color: #666;
  margin-bottom: 20px;
}

.card-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.card-button:hover {
  background-color: #45a049;
}

.quick-start {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.quick-start h2 {
  margin-bottom: 20px;
  color: #2c3e50;
  font-size: 1.8em;
}

.quick-start ol {
  padding-left: 20px;
}

.quick-start li {
  margin-bottom: 15px;
  color: #666;
  font-size: 1.1em;
}

.quick-start a {
  color: #4CAF50;
  text-decoration: none;
  font-weight: bold;
}

.quick-start a:hover {
  text-decoration: underline;
}
</style> 