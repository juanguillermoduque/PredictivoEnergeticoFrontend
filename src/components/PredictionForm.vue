<template>
  <div class="prediction-container">
    <!-- <p>Se realizara la predicción de consumo energetico de en el rango de fecha seleccionado</p> -->
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
      
      <button type="submit" class="submit-button" :disabled="loading">
        {{ loading ? 'Generando predicción...' : 'Generar Predicción' }}
      </button>
    </form>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    
    <div class="plot-container" v-if="base_64">
      <img :src="'data:image/png;base64,' + base_64" alt="predición generada" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { predictionService } from '../services/api';

const startDate = ref('');
const endDate = ref('');
const loading = ref(false);
const error = ref(null);
const base_64 = ref(null);

const submitPrediction = async () => {
  loading.value = true;
  error.value = null;
  base_64.value = null;
  
  try {
    const response = await predictionService.predict({
      start_date: startDate.value,
      end_date: endDate.value,
    });
    
    if(response?.data?.base_64){
      base_64.value = response?.data?.base_64;
    }
    loading.value = false;
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