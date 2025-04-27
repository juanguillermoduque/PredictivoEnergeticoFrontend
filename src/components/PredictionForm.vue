<template>
  <div class="prediction-container">
    <form @submit.prevent="submitPrediction" class="prediction-form">
      <div class="form-group">
        <label>Fecha de inicio:</label>
        <input 
          type="date" 
          v-model="startDate" 
          required 
          class="form-input"
        />
      </div>
      
      <div class="form-group">
        <label>Fecha de fin:</label>
        <input 
          type="date" 
          v-model="endDate" 
          required 
          class="form-input"
        />
      </div>
      
      <div class="form-group">
        <label>Variable a predecir:</label>
        <select v-model="targetColumn" required class="form-input">
          <option value="demanda_real">Demanda Real</option>
          <option value="generacion_total">Generación Total</option>
          <option value="precio_bolsa">Precio Bolsa</option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Modelo:</label>
        <select v-model="modelType" required class="form-input">
          <option value="random_forest">Random Forest</option>
          <option value="gradient_boosting">Gradient Boosting</option>
          <option value="linear_regression">Regresión Lineal</option>
          <option value="svr">SVR</option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Horas a predecir:</label>
        <input 
          type="number" 
          v-model="stepsAhead" 
          min="1" 
          max="168" 
          required 
          class="form-input"
        />
      </div>
      
      <button type="submit" class="submit-button" :disabled="loading">
        {{ loading ? 'Generando predicción...' : 'Generar Predicción' }}
      </button>
    </form>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    
    <div v-if="result" class="result-container">
      <h3>Resultados de la predicción</h3>
      
      <div class="metrics">
        <div class="metric">
          <span class="metric-label">MSE:</span>
          <span class="metric-value">{{ result.metrics.mse.toFixed(4) }}</span>
        </div>
        <div class="metric">
          <span class="metric-label">R²:</span>
          <span class="metric-value">{{ result.metrics.r2.toFixed(4) }}</span>
        </div>
      </div>
      
      <div class="plot-container" v-if="plotData">
        <vue-plotly 
          :data="plotData.data" 
          :layout="plotData.layout"
          :config="{ responsive: true }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { predictionService } from '../services/api';
import { VuePlotly } from 'vue3-plotly';

const startDate = ref('');
const endDate = ref('');
const targetColumn = ref('demanda_real');
const modelType = ref('random_forest');
const stepsAhead = ref(24);
const loading = ref(false);
const error = ref(null);
const result = ref(null);
const plotData = ref(null);

const submitPrediction = async () => {
  loading.value = true;
  error.value = null;
  result.value = null;
  plotData.value = null;
  
  try {
    const response = await predictionService.predict({
      start_date: startDate.value,
      end_date: endDate.value,
      target_column: targetColumn.value,
      model_type: modelType.value,
      steps_ahead: stepsAhead.value
    });
    
    result.value = response.data;
    plotData.value = JSON.parse(response.data.plot_data);
  } catch (err) {
    error.value = 'Error al generar la predicción: ' + (err.response?.data?.error || err.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.prediction-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.prediction-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.submit-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #45a049;
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #dc3545;
  border-radius: 4px;
  background-color: #f8d7da;
}

.result-container {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.metrics {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

.metric {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.metric-label {
  font-weight: bold;
  color: #666;
}

.metric-value {
  font-size: 1.2em;
  color: #333;
}

.plot-container {
  width: 100%;
  height: 500px;
  margin-top: 20px;
}
</style> 