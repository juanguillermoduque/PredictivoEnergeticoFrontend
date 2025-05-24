<template>
  <div class="visualization-container">
    <div class="controls">
      <div class="date-range">
        <input 
          type="date" 
          v-model="startDate" 
          @change="updateVisualization"
          class="date-input"
        />
        <input 
          type="date" 
          v-model="endDate" 
          @change="updateVisualization"
          class="date-input"
        />
      </div>
      <div class="visualization-type">
        <select v-model="visualizationType" @change="updateVisualization" class="select-input">
          <option value="outler">Demanda Real</option>
          <option value="coolwarm">Matriz de correlación entre horas</option>
          <option value="demanda_real_vs_z_score">Demanda real Vs Z Score</option>
          <option value="box_plot">Gráfico de Caja</option>
          <option value="histogram">Histograma</option>
          <option value="warm_map">Mapa de Calor</option>
          <option value="acumilativo_demanda_horaria">Acumulativo Demanda Horaria</option>
          <option value="line_demanda_promedio">Demanda Promedio</option>
          <option value="barras_demanda_promedio_hora">Barras Demanda Promedio por Hora</option>
          <option value="barras_demanda_promedio_mes">Barras Demanda Promedio por Mes</option>
          <option value="barras_demanda_promedio_dia">Barras Demanda Promedio por Día</option>
          <option value="barras_demanda_promedio_anio">Barras Demanda Promedio por Año</option>
          <option value="barras_acumulado_promedio_anio_mes">Barras Acumulado Promedio por Año y Mes</option>
          <option value="dispersion_horaria">Dispersión Horaria</option>
          <option value="historico_minimo_maximo">Histórico Mínimo y Máximo</option>
        </select>
      </div>
    </div>
    
    <div class="plot-container" v-if="base_64">
      <img :src="'data:image/png;base64,' + base_64" alt="Visualización generada" />
    </div>

    <div v-if="isLoading" >
      <div class="loading-spinner">
        <span class="spinner"></span> Cargando visualización...
      </div>
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { xmService } from '../services/api';

const startDate = ref('');
const endDate = ref('');
const visualizationType = ref('coolwarm');
const error = ref(null);
const base_64 = ref(null);
const isLoading = ref(false);

const updateVisualization = async () => {
  isLoading.value = true;
  base_64.value = null;
  if (!startDate.value || !endDate.value) return;
  
  try {
    error.value = null;
    const params = {
      start_date: startDate.value,
      end_date: endDate.value,
      type: visualizationType.value
    };
    
    const response = await xmService.fetchVisualizations(params);

    if(response?.data?.base_64){
      base_64.value = response?.data?.base_64;
    }
    isLoading.value = false;
  } catch (err) {
    error.value = 'Error al cargar la visualización: ' + (err.response?.data?.error || err.message);
    isLoading.value = false;
  }
};

onMounted(() => {
  // Establecer fechas por defecto (último mes)
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - 1);
  
  startDate.value = start.toISOString().split('T')[0];
  endDate.value = end.toISOString().split('T')[0];
  
  updateVisualization();
});
</script>

<style scoped>
.visualization-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.date-range {
  display: flex;
  gap: 10px;
}

.date-input, .select-input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.plot-container {
  width: 100%;
  height: 600px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error-message {
  color: #dc3545;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #dc3545;
  border-radius: 4px;
  background-color: #f8d7da;
}

.loading-spinner {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  color: #333;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 3px solid #ccc;
  border-top: 3px solid #333;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

</style> 