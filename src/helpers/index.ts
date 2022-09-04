const UCFirst = (string : string) : string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const beaufortScale = (speed : number) : string => {
    const speeds = [ 0, 2, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118 ];
    const index = speeds.filter(value => value < speed).length;
    const scales = ['Calm', 'Light air', 'Light breeze', 'Gentle breeze', 'Moderate breeze', 'Fresh breeze', 'Strong breeze', 'High wind', 'Gale', 'Strong gale', 'Storm', 'Violent Storm', 'Hurricane']
    return (scales[index]) ? scales[index] : scales[scales.length - 1];
}

const compassPoints = (deg: number): string => {
    deg = (deg > 348) ? 0 : deg;
    const map: {[key: string]: [number, number]} = {
        'N': [-1, 11],
        'NNE': [11, 33],
        'NE': [33, 56],
        'ENE': [56, 78],
        'E': [78, 101],
        'ESE': [101, 123],
        'SE': [123, 146],
        'SSE': [146, 168],
        'S': [168, 191],
        'SSW': [191, 213],
        'SW': [213, 236],
        'WSW': [236, 258],
        'W': [258, 281],
        'WNW': [281, 303],
        'NW': [303, 326],
        'NNW': [326, 348]
    }

    for(const key in map){
        if(map[key][0] < deg && map[key][1] >= deg) return key;
    }
    return '???';
}

const weatherDescription = (description: string, feelsLike: number, windSpeed: number): string => {
    return `Feels like ${Math.round(feelsLike)}°C. ${UCFirst(description)}. ${beaufortScale(windSpeed)}`;
}

const distance = (meters: number): string => {
    return (meters > 999) ? `${(meters/1000).toFixed(1)} km` : `${meters} m`;
}

const dewPoint = (temp: number, humidity: number): number => {
    return Math.round(temp - ((100 - humidity)/5));
}

export {
    UCFirst,
    beaufortScale,
    compassPoints,
    weatherDescription,
    distance,
    dewPoint
}