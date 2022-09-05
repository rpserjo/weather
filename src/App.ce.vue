<template>
  <div class="widget__wrapper">
    <transition name="slide" mode="out-in">
      <Icon v-if="!showSettings" icon="gear" class="button settings" @click="showSettings = true"/>
      <Icon v-else icon="close" class="button settings" @click="showSettings = false"/>
    </transition>
    <transition name="slide">
      <Settings v-if="showSettings" v-model="savedLocations" />
    </transition>
    <Location v-for="location in savedLocations" :key="location" :location="location"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LocationComponent from '@/components/LocationComponent.vue';
import IconsUIComponent from '@/components/IconsUIComponent.vue';
import SettingsComponent from '@/components/SettingsComponent.vue';
import {detectLocation} from '@/http';

export default defineComponent({
  name: 'App',
  components: {
    Location: LocationComponent,
    Icon: IconsUIComponent,
    Settings: SettingsComponent
  },
  computed: {

  },
  data() {
    return {
      savedLocations: JSON.parse(localStorage.getItem(process.env.VUE_APP_LOCALSTORAGE_KEY) || '[]'),
      showSettings: false,
      weathers: []
    }
  },
  methods: {
    detectCurrentPosition(){
      const onSuccess = async (position: GeolocationPosition) => {
        const location = await detectLocation(position.coords.latitude, position.coords.longitude);
        if(location && location.length > 0 && location[0].name){
          this.savedLocations.push({
            locationName: location[0].name,
            locationCountryCode: location[0].country,
            locationCoords: {
              latitude: location[0].lat,
              longitude: location[0].lon
            }
          });
        }else{
				alert('Location is not detected');        
        }
      }

      const onError = (error: GeolocationPositionError) => {
        alert(`Geolocation permission denied. Error code: ${error.code}`);
      }

      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    },

    saveLocations(){
      localStorage.setItem(process.env.VUE_APP_LOCALSTORAGE_KEY, JSON.stringify(this.savedLocations));
    }
  },
  mounted() {
    if(this.savedLocations.length == 0){
      this.detectCurrentPosition();
    }
  },
  watch: {
    savedLocations:{
      handler: function (newValue) {
        this.saveLocations();
        if(newValue.length == 0){
          this.detectCurrentPosition();
        }
       },
      deep: true
    }
  }
});
</script>
<style lang="scss">
@import "./assets/scss/style.scss";
</style>