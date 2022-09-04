import axios from 'axios'

const apiHost = axios.create({
    baseURL: process.env.VUE_APP_OPENWEATHER_GATE,
    params: {
        appid: process.env.VUE_APP_OPENWEATHER_API_KEY
    }
});

const getWeather = async (lat: number, lon: number) => {
    const {data} = await apiHost.get('data/2.5/weather', {params: {
            lat: lat,
            lon: lon,
            units: 'metric'
        }});
    return data;
}

const searchLocation = async (searchQuery: string) => {
    const {data} = await apiHost.get('geo/1.0/direct', {params: {q: searchQuery, limit: 10}});
    return data;
}

export {
    getWeather,
    searchLocation
}