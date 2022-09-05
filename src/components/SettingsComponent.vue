<template>
  <div class="widget__settings">
    <h3>Settings</h3>
    <Draggable :list="modelValue" handle=".saved__location__handle">
      <transition-group name="slide">
        <div v-for="location in modelValue" class="saved__location" :key="location">
          <div class="saved__location__handle"><icon icon="hamburger" class="move" fill="crimson" w="24" h="24"/></div>
          <div class="saved__location__title">{{location.locationName}}, {{location.locationCountryCode}}</div>
          <div class="saved__location__delete"><icon icon="delete" class="pointer" w="24" h="24" @click="removeLocation(location)"/></div>
        </div>
      </transition-group>
    </Draggable>
    <h4>Add Location</h4>
    <div class="search__form">
      <div class="line">
        <input type="text" v-model="searchQuery" @keyup.enter="search"/>
        <div class="buttons">
          <transition name="fade-in" mode="in-out">
            <Icon v-if="!isLoading && !isError" icon="arrow" w="24" h="24" class="pointer" @click="search"/>
            <Spinner v-else-if="isLoading" />
            <Icon v-else icon="warning" w="24" h="24" class="pointer warning" @click="search"/>
          </transition>
        </div>
      </div>
      <div class="search__results">
        <transition-group name="slide-vertical" mode="out-in">
          <div class="element" v-for="location in searchResults" :key="location" @click="pushLocation(location)">
            {{location.locationName}}, {{location.locationCountryCode}}
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {searchLocation} from '@/http';
import {VueDraggableNext} from 'vue-draggable-next';
import IconUIComponent from '@/components/IconsUIComponent.vue';
import SpinnerUIComponent from '@/components/SpinnerUIComponent.vue';
import {SavedLocation} from '@/types';

export default defineComponent({
  components: {
    Draggable: VueDraggableNext,
    Icon: IconUIComponent,
    Spinner: SpinnerUIComponent
  },
  props: {
    modelValue: {
      type: Array,
      default: Object as () => Array<SavedLocation>
    }
  },
  data() {
    return {
      searchQuery: '' as string,
      searchResults: [] as Array<SavedLocation>,
      isLoading: false,
      isError: false
    }
  },
  methods: {
    async search() {
      this.isLoading = true;
      this.isError = false;
      try{
        const data = await searchLocation(this.searchQuery);
        if(data && data.length > 0) {
          this.searchResults = data.map((result: any) => {
            return {
              locationName: result.name,
              locationCountryCode: result.country,
              locationCoords: {
                latitude: result.lat,
                longitude: result.lon
              }
            }
          });
        }
      }catch(e){
        this.isError = true;
      }finally{
        this.isLoading = false;
      }

    },
    pushLocation(location: SavedLocation): void{
      const filtered = this.modelValue.filter((element: any) => {
        return (
            element.locationName == location.locationName
            && element.locationCoords.latitude == location.locationCoords.latitude
            && element.locationCoords.longitude == location.locationCoords.longitude
        )
      });
      if(filtered.length == 0) this.$emit('update:modelValue', [...this.modelValue, location]);
    },
    removeLocation(location: SavedLocation): void{
      const index = this.modelValue?.indexOf(location);
      this.$emit('update:modelValue', this.modelValue?.filter((e, i) => i != index));
    }
  }
});
</script>