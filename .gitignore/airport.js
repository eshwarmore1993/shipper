module.exports = class Airport {

    constructor(id, lat, long) {
        this.id = id;
        this.latitude = lat;
        this.longitude = long;
        this.neighborAirports = [];
        this.EARTH_RADIUS = 4000;
    }

    distanceToAirport(other) {
        return this.EARTH_RADIUS * Math.acos(Math.sin(this.latitude) * Math.sin(other.latitude) + Math.cos(this.latitude) * Math.cos(other.latitude) * Math.cos(this.longitude - other.longitude));
    }

    addNeighbor(airport) {
        this.neighborAirports.push(airport);
    }

}