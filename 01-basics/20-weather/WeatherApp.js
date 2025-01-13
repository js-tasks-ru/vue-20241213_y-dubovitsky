import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

const convertTemperature = (measure, temp) => {
  switch (measure) {
    case 'Kelvin': {
      return (temp - 273.15).toFixed(1)
    }
    case 'Celsius': {
      return (temp + 273.15).toFixed(1)
    }
    default:
      return temp
  }
}

const getWeather = (key) => {
  return WeatherConditionIcons[key]
}

export default defineComponent({
  name: 'WeatherApp',
  setup() {
    const weatherDataArray = getWeatherData()
    const weatherIcon = (param) => getWeather(param)

    const computedWeatherNightClass = ({ dt, sunrise, sunset }) => {
      // Получаем текущее время
      const now = new Date();
      
      // Преобразуем строки времени в объекты Date
      const [dtHours, dtMinutes] = dt.split(':').map(Number);
      const localDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), dtHours, dtMinutes).getTime();
    
      const [sunriseHours, sunriseMinutes] = sunrise.split(':').map(Number);
      const localSunriseTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), sunriseHours, sunriseMinutes).getTime();
    
      const [sunsetHours, sunsetMinutes] = sunset.split(':').map(Number);
      const localSunsetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), sunsetHours, sunsetMinutes).getTime();
    
      // Проверяем, находится ли локальное время вне диапазона между восходом и закатом
      if (localDateTime < localSunriseTime || localDateTime > localSunsetTime) {
        return 'weather-card--night'; // Ночь
      }
    }

    return {
      weatherDataArray,
      convertTemperature,
      weatherIcon,
      computedWeatherNightClass
    }
  },
  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
        <template v-for="item in weatherDataArray">
          <ul class="weather-list unstyled-list">
            <li :class="['weather-card', computedWeatherNightClass(item.current)]">
              <div v-if="item.alert" class="weather-alert">
                <span class="weather-alert__icon">⚠️</span>
                <span class="weather-alert__description">{{item.alert.sender_name}}:{{item.alert.description}}</span>
              </div>
              <div>
                <h2 class="weather-card__name">
                  {{item.geographic_name}}
                </h2>
                <div class="weather-card__time">
                  {{item.current.dt}}
                </div>
              </div>
              <div class="weather-conditions">
                <div class="weather-conditions__icon" :title="item.current.weather.description">{{weatherIcon(item.current.weather.id)}}</div>
                <div class="weather-conditions__temp">{{convertTemperature('Kelvin', item.current.temp)}} °C</div>
              </div>
              <div class="weather-details">
                <div class="weather-details__item">
                  <div class="weather-details__item-label">Давление, мм рт. ст.</div>
                  <div class="weather-details__item-value">{{(item.current.pressure * 0.75).toFixed(0)}}</div>
                </div>
                <div class="weather-details__item">
                  <div class="weather-details__item-label">Влажность, %</div>
                  <div class="weather-details__item-value">{{item.current.humidity}}</div>
                </div>
                <div class="weather-details__item">
                  <div class="weather-details__item-label">Облачность, %</div>
                  <div class="weather-details__item-value">{{item.current.clouds}}</div>
                </div>
                <div class="weather-details__item">
                  <div class="weather-details__item-label">Ветер, м/с</div>
                  <div class="weather-details__item-value">{{item.current.wind_speed}}</div>
                </div>
              </div>
            </li>
          </ul>
      </template>
    </div>
  `,
})
