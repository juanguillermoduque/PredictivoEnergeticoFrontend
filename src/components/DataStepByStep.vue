<template>
  <div class="step-by-step-container">
    <h2>Guía Paso a Paso</h2>
    
    <div class="steps">
      <div class="step" v-for="(step, index) in steps" :key="index">
        <div class="step-header" @click="toggleStep(index)">
          <span class="step-number">{{ index + 1 }}</span>
          <h3>{{ step.title }}</h3>
          <span class="step-toggle">{{ expandedSteps[index] ? '−' : '+' }}</span>
        </div>
        
        <div class="step-content" v-show="expandedSteps[index]">
          <p>{{ step.description }}</p>
          
          <div v-if="step.code" class="code-block">
            <pre><code>{{ step.code }}</code></pre>
          </div>
          
          <div v-if="step.image" class="image-block">
            <img :src="step.image" :alt="step.title">
          </div>
          
          <div v-if="step.tryIt" class="try-it-block">
            <button @click="tryStep(index)" class="try-button">
              Probar este paso
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { xmService } from '../services/api';

const steps = [
  {
    title: 'Obtención de Datos',
    description: 'Los datos se obtienen de la API de XM, que proporciona información sobre demanda real, generación total y precio de bolsa.',
    code: `const response = await xmService.fetchData({
  start_date: '2023-01-01',
  end_date: '2023-12-31'
});`,
    tryIt: true
  },
  {
    title: 'Preprocesamiento',
    description: 'Los datos se normalizan y se preparan para el análisis, incluyendo la creación de secuencias temporales.',
    code: `// Normalización de datos
const scaler = new MinMaxScaler();
const scaled_data = scaler.fit_transform(data);

// Creación de secuencias
const sequence_length = 24;
const X, y = create_sequences(scaled_data, sequence_length);`,
    tryIt: true
  },
  {
    title: 'Entrenamiento del Modelo',
    description: 'Se entrena el modelo seleccionado con los datos históricos.',
    code: `// Entrenamiento del modelo
const model = new RandomForestRegressor();
model.fit(X_train, y_train);

// Evaluación
const metrics = model.evaluate(X_test, y_test);`,
    tryIt: true
  },
  {
    title: 'Generación de Predicciones',
    description: 'El modelo genera predicciones para las próximas horas.',
    code: `// Generación de predicciones
const predictions = model.predict(future_data);

// Visualización
const plot = create_prediction_plot(historical_data, predictions);`,
    tryIt: true
  }
];

const expandedSteps = ref(steps.map(() => false));

const toggleStep = (index) => {
  expandedSteps.value[index] = !expandedSteps.value[index];
};

const tryStep = async (index) => {
  try {
    switch (index) {
      case 0:
        // Obtener datos
        const response = await xmService.fetchData({
          start_date: '2023-01-01',
          end_date: '2023-12-31'
        });
        console.log('Datos obtenidos:', response.data);
        break;
      case 1:
        // Preprocesamiento
        const preprocessResponse = await xmService.fetchStepByStep({
          start_date: '2023-01-01',
          end_date: '2023-12-31'
        });
        console.log('Datos preprocesados:', preprocessResponse.data);
        break;
      case 2:
        // Entrenamiento
        const trainResponse = await xmService.fetchStepByStep({
          start_date: '2023-01-01',
          end_date: '2023-12-31'
        });
        console.log('Modelo entrenado:', trainResponse.data);
        break;
      case 3:
        // Predicciones
        const predictResponse = await xmService.fetchStepByStep({
          start_date: '2023-01-01',
          end_date: '2023-12-31'
        });
        console.log('Predicciones generadas:', predictResponse.data);
        break;
    }
  } catch (error) {
    console.error('Error al probar el paso:', error);
  }
};
</script>

<style scoped>
.step-by-step-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.step-header {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f8f9fa;
  cursor: pointer;
  user-select: none;
}

.step-number {
  width: 30px;
  height: 30px;
  background-color: #4CAF50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-weight: bold;
}

.step-toggle {
  margin-left: auto;
  font-size: 24px;
  color: #666;
}

.step-content {
  padding: 20px;
}

.code-block {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  margin: 15px 0;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  white-space: pre-wrap;
}

.image-block {
  margin: 15px 0;
}

.image-block img {
  max-width: 100%;
  border-radius: 4px;
}

.try-it-block {
  margin-top: 15px;
}

.try-button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.try-button:hover {
  background-color: #45a049;
}
</style> 