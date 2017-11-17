const Airport = require('./airport');

module.exports = class CloudTravel {

    shortestTrip(self, latitude, longitude, canTravel, origin, destination) {
        let airports = this.createAirports(latitude, longitude);
        for (let i = 0; i < canTravel.length; i++) {
            canTravel[i].forEach(function (element) {
                airports[i].addNeighbor(airports[element]);
            }, this);
        }
        
        // to be evaluated for minimum distance from origin
        let toBeEvaluated = [];
        // shortest distance of origin from origin is zero
        airports[origin].shortestDistanceFromOrigin = 0;

        toBeEvaluated.push(airports[origin]);

        while (toBeEvaluated !== []) {
            // get airport with shortest distance from toBeEvaluated
            let nearestAirport = this.getShortestDistanceAirportFrom(toBeEvaluated);
            nearestAirport.evaluated = true;
            
            // check if this is destination
            if (nearestAirport.id === destination) {
                return nearestAirport.shortestDistanceFromOrigin;
            }

            // for each airport in neighbor of it which is not evaluated
            nearestAirport.neighborAirports.forEach(function (airport) {
                if (!airport.evaluated) {
                    if (!airport.shortestDistanceFromOrigin || (airport.shortestDistanceFromOrigin >
                        (nearestAirport.shortestDistanceFromOrigin + nearestAirport.distanceToAirport(airport)))) {
                        airport.shortestDistanceFromOrigin = nearestAirport.shortestDistanceFromOrigin + nearestAirport.distanceToAirport(airport);
                    }
                    toBeEvaluated.push(airport);
                }
            }, this);
        }

        return -1;
    }

    createAirports(latitudes, longitudes) {
        let airports = [];
        for (let i = 0; i < latitudes.length; i++) {
            airports.push(new Airport(i, latitudes[i], longitudes[i]));
        }

        return airports;
    }

    getShortestDistanceAirportFrom(airports) {
        let distance;
        let index;
        let airport;
        for(let i=0; i<airports.length; i++){
            if(!distance || distance > airports[i].shortestDistanceFromOrigin) {
                distance = airports[i].shortestDistanceFromOrigin;
                index = i;
            }
        }

        airport = airports[index];

        airports.splice(index, 1);
        return airport;
    }
}