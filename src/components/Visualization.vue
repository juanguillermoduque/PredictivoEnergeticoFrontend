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
          <option value="time_series">Serie Temporal</option>
          <option value="correlation">Correlación</option>
          <option value="box_plot">Gráfico de Caja</option>
          <option value="histogram">Histograma</option>
        </select>
        <select 
          v-if="visualizationType === 'box_plot' || visualizationType === 'histogram'"
          v-model="selectedColumn" 
          @change="updateVisualization"
          class="select-input"
        >
          <option value="demanda_real">Demanda Real</option>
          <option value="generacion_total">Generación Total</option>
          <option value="precio_bolsa">Precio Bolsa</option>
        </select>
      </div>
    </div>
    
    <div class="plot-container" v-if="plotData">
      <vue-plotly 
        :data="plotData.data" 
        :layout="plotData.layout"
        :config="{ responsive: true }"
      />
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { xmService } from '../services/api';
import { VuePlotly } from 'vue3-plotly';

const startDate = ref('');
const endDate = ref('');
const visualizationType = ref('time_series');
const selectedColumn = ref('demanda_real');
const plotData = ref(null);
const error = ref(null);

const updateVisualization = async () => {
  if (!startDate.value || !endDate.value) return;
  
  try {
    error.value = null;
    const params = {
      start_date: startDate.value,
      end_date: endDate.value,
      type: visualizationType.value
    };
    
    if (visualizationType.value === 'box_plot' || visualizationType.value === 'histogram') {
      params.column = selectedColumn.value;
    }
    
    const response = await xmService.fetchVisualizations(params);
    plotData.value = JSON.parse(response.data.plot_data);
  } catch (err) {
    error.value = 'Error al cargar la visualización: ' + (err.response?.data?.error || err.message);
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
  overflow: hidden;
}

.error-message {
  color: #dc3545;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #dc3545;
  border-radius: 4px;
  background-color: #f8d7da;
}
</style> 