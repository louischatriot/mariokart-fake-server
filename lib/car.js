var cars = {}
  , start = Date.now()
  , car1Ride = []
  , car2Ride = []
  , timeExpander = 1
  ;

car1Ride.push({ lat: 37.567699, lon: -122.325565, time: 0 * timeExpander });
car1Ride.push({ lat: 37.570408, lon: -122.328506, time: 7 * 1000 * timeExpander });
car1Ride.push({ lat: 37.569642, lon: -122.329579, time: 10 * 1000 * timeExpander });
car1Ride.push({ lat: 37.566589, lon: -122.326296, time: 18 * 1000 * timeExpander });
car1Ride.push({ lat: 37.567236, lon: -122.325051, time: 21 * 1000 * timeExpander });
car1Ride.push({ lat: 37.567699, lon: -122.325565, time: 24 * 1000 * timeExpander });

car2Ride.push({ lat: 37.567699, lon: -122.325565, time: 0 * timeExpander });
car2Ride.push({ lat: 37.567699, lon: -122.325565, time: 3 * 1000 * timeExpander });
car2Ride.push({ lat: 37.56909, lon: -122.327047, time: 7 * 1000 * timeExpander });
car2Ride.push({ lat: 37.568299, lon: -122.328152, time: 8.5 * 1000 * timeExpander });
car2Ride.push({ lat: 37.566589, lon: -122.326296, time: 14 * 1000 * timeExpander });
car2Ride.push({ lat: 37.567236, lon: -122.325051, time: 17 * 1000 * timeExpander });
car2Ride.push({ lat: 37.567699, lon: -122.325565, time:19 * 1000 * timeExpander });



  
function getCarPosition (ride, time) {
  var res, i, current, next, i0, alpha;

  for (i = 0; i < ride.length; i += 1) {
    if (time >= ride[i].time) {
      i0 = i
    }
  }
  
  // Hack
  current = ride[i0];
  next = ride[i0 < ride.length ? i0 + 1 : ride.length - 1];
  try {
    alpha = (time - current.time) / (next.time - current.time);
    res = { lat: alpha * next.lat + (1 - alpha) * current.lat, lon: alpha * next.lon + (1 - alpha) * current.lon };    
  } catch(e) {
    res = current;
  }

  return res;
}  


function getCurrentCarsPosition () {
  var time = Date.now() - start;
  
  return { car1: getCarPosition(car1Ride, time), car2: getCarPosition(car2Ride, time) };
}


function resetTime () {
  start = Date.now();
}


// Interface
module.exports.getCurrentCarsPosition = getCurrentCarsPosition;
module.exports.resetTime = resetTime;