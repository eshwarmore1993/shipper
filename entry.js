const CloudTravel = require('./cloud-travel');
const ConsoleReader = require('./console-reader');

const _reader = new ConsoleReader();

let lats = _reader.readLine('Please Enter latitudes in {}');
let longs = _reader.readLine('Please Enter longitudes in {}');
let paths = _reader.readLine('Please Enter path for each airport in {}');
let source = _reader.readLine('Please Enter source integer');
let destination = _reader.readLine('Please Enter destination integer');

let latitudes = parseLatitudesLongitudes(lats.split('{')[1].split(','));
let longitudes = parseLatitudesLongitudes(longs.split('{')[1].split(','));
let canTravel = parseTravelRoutes(paths.split('{')[1].split('}')[0].split(','));

source = parseInt(source.split("'")[1]);
destination = parseInt(destination.split("'")[1])

const _cloudTravel = new CloudTravel();

console.log(_cloudTravel.shortestTrip(this, latitudes, longitudes, canTravel, source, destination));

function parseLatitudesLongitudes(elements) {
    let result = [];
    elements.forEach(function (element) {
        result.push(parseInt(element) * (Math.PI / 180));
    }, this);

    return result;
}

function parseTravelRoutes(canTravel) {
    let routes = [];
    let i = 0;
    canTravel.forEach(function (travel) {
        travel.split('\n').forEach(function (route) {
            routes[i] = [];
            route.trim().split('"')[1].split(' ').forEach(function (element) {
                routes[i].push(parseInt(element));
            }, this);
            i++;
        }, this);
    }, this);

    return routes;
}