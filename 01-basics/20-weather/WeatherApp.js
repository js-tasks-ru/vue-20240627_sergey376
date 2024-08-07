import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'


export default defineComponent({
  name: 'WeatherApp',

  setup(){
    function  getIcons() {
      return WeatherConditionIcons
    }
    return {
      icons: getIcons()
    }
  },

  data() {
    return {
      weathers: getWeatherData(),
    }
  },
  methods: {
    sunriseOrSunset(weather){
      return (((Number(weather.current.dt.substring(0,2)) * 60 +
          Number(weather.current.dt.substring(3,5))) > (Number(weather.current.sunset.substring(0,2)) * 60 + Number(weather.current.sunset.substring(3,5)))) ||
        ((Number(weather.current.dt.substring(0,2)) * 60 +
          Number(weather.current.dt.substring(3,5))) < (Number(weather.current.sunrise.substring(0,2)) * 60 + Number(weather.current.sunrise.substring(3,5)))))
    }
  },
  template: `
    <div>
    <h1 class="title">Погода в Средиземье</h1>

    <div v-for="weather in weathers">
      <ul class="weather-list unstyled-list">
        <li class="weather-card" :class="{'weather-card--night' : sunriseOrSunset(weather)}">
          <div v-if="weather.alert !== null" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ weather.alert.sender_name }}:
              {{ weather.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ weather.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ weather.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weather.current.weather.description">
              <div>
                {{ icons[weather.current.weather.id] }}
              </div>
            </div>
            <div class="weather-conditions__temp">{{ Number(weather.current.temp - 273.15).toFixed(1) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ Number(weather.current.pressure * 0.75).toFixed() }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weather.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weather.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weather.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    </div>
  `,
})
