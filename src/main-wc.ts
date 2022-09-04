import { defineCustomElement } from 'vue'
import App from './App.ce.vue'

const WeatherWidget = defineCustomElement(App)
customElements.define('weather-widget', WeatherWidget)
