export interface Coords{
    latitude: number;
    longitude: number;
}

export interface SavedLocation{
    locationName: string;
    locationCountryCode: string;
    locationCoords: Coords;
}