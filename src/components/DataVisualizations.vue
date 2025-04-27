<template>
  <div class="visualizations-container">
    <div class="controls">
      <select v-model="selectedChart">
        <option value="heatmap">Mapa de Calor</option>
        <option value="daily">Demanda Diaria</option>
        <option value="hourly">Promedio por Hora</option>
      </select>
      
      <div class="date-range">
        <input type="date" v-model="startDate">
        <input type="date" v-model="endDate">
      </div>
      
      <button @click="updateChart" :disabled="loading">
        {{ loading ? 'Cargando...' : 'Actualizar' }}
      </button>
    </div>

    <div class="chart-container">
      <vue-plotly
        :data="chartData"
        :layout="chartLayout"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { VuePlotly } from 'vue3-plotly'
import { xmService } from '@/services/api'

const selectedChart = ref('daily')
const startDate = ref('')
const endDate = ref('')
const chartData = ref([])
const chartLayout = ref({})
const loading = ref(false)

async function updateChart() {
  try {
    loading.value = true
    const response = await xmService.fetchVisualizations({
      type: selectedChart.value,
      start_date: startDate.value,
      end_date: endDate.value
    })
    
    chartData.value = response.data
    updateLayout()
  } catch (error) {
    console.error('Error fetching chart data:', error)
  } finally {
    loading.value = false
  }
}

function updateLayout() {
  const layouts = {
    heatmap: {
      title: 'Mapa de Calor - Distribución Horaria',
      xaxis: { title: 'Hora' },
      yaxis: { title: 'Hora' }
    },
    daily: {
      title: 'Demanda Diaria',
      xaxis: { title: 'Fecha' },
      yaxis: { title: 'Demanda (kWh)' }
    },
    hourly: {
      title: 'Promedio por Hora',
      xaxis: { title: 'Hora' },
      yaxis: { title: 'Demanda Promedio (kWh)' }
    }
  }
  
  chartLayout.value = layouts[selectedChart.value]
}

onMounted(() => {
  updateChart()
})

watch(selectedChart, updateChart)
</script>