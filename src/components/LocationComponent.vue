<template>
  <div class="widget__location__wrapper">
    <div class="widget__location__name">
      <span class="location">{{location.locationName}}</span>
      <span class="country">{{location.locationCountryCode}}</span>
    </div>
    <transition name="fade-in" mode="in-out">
      <Spinner v-if="isLoading" />
      <div v-else-if="!isLoading && !isError" class="widget__location__weather">
      <div class="widget__location__weather__main">
        <div class="weather__icon"
             :style="{backgroundImage: `url(https://openweathermap.org/img/wn/${this.weather?.weather[0]?.icon}@2x.png`}"
        ></div>
        <div class="weather__temp">
          {{Math.round(weather?.main?.temp)}}&deg;C
        </div>
      </div>
      <div class="widget__location__weather__description">
        {{this.weatherDescription}}
      </div>
      <div class="widget__location__weather__extra">
        <div class="entry">
          <icon icon="direction" w="16" h="16" :style="{transform: `rotate(${weather?.wind?.deg}deg`}" />
          {{weather?.wind?.speed.toFixed(1)}} m/s {{windDirection}}
        </div>
        <div class="entry">
          {{weather?.main?.pressure}} hPa
        </div>
        <div class="entry">
          Humidity: {{weather?.main?.humidity}} %
        </div>
        <div class="entry">
          Dew point: {{dewPoint}}&deg;C
        </div>
        <div class="entry">
          Visibility: {{ visibility }}
        </div>
      </div>
    </div>
      <Icon v-else icon="warning" absolute="true" w="80" h="80" class="warning"/>
    </transition>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {compassPoints, weatherDescription, distance, dewPoint} from '@/helpers'
import {getWeather} from '@/http';
import IconsUIComponent from '@/components/IconsUIComponent';
import SpinnerUIComponent from '@/components/SpinnerUIComponent';

export default defineComponent( {
  name: 'LocationComponent',
  components: {
    Icon: IconsUIComponent,
    Spinner: SpinnerUIComponent
  },
  props: {
    location: {
      type: Object
    }
  },
  computed:{
    weatherDescription() {
      return weatherDescription(this.weather?.weather[0]?.description, this.weather?.main?.feels_like, this.weather?.wind?.speed);
    },
    windDirection() {
      return compassPoints(this.weather?.wind?.deg);
    },
    visibility() {
      return distance(this.weather?.visibility);
    },
    dewPoint() {
      return dewPoint(this.weather?.main?.temp, this.weather?.main?.humidity);
    }
  },
  data() {
    return {
      weather: {},
      isLoading: true,
      isError: false
    }
  },
  methods: {
    async fetchWeather(){
      try{
        this.weather = await getWeather(this.location.locationCoords.latitude, this.location.locationCoords.longitude);
      }catch (e){
        this.isError = true;
      }finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.fetchWeather();
  }
});
</script>