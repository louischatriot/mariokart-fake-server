var cars = {}
  , start = Date.now()
  , car1Ride = []
  , car2Ride = []
  ;

car1Ride.push({ lat: 37.567699, lon: -122.325565, time: 0 });
car1Ride.push({ lat: 37.570408, lon: -122.328506, time: 20 * 1000 });
  
function getCarPosition (ride, time) {
  var res, i, current, next, i0, alpha;

  for (i = 0; i < ride.length; i += 1) {
    if (time >= ride[i].time) {
      i0 = i
    }
  }
  
  current = ride[i0];
  next = ride[i0 < ride.length ? i0 + 1 : ride.length - 1];
  alpha = (time - current.time) / (next.time - current.time);
  res = { lat: alpha * next.lat + (1 - alpha) * current.lat, lon: alpha * next.lon + (1 - alpha) * current.lon };

  return res;
}  


function getCurrentCarsPosition () {
  var time = Date.now() - start;
  
  return { car1: getCarPosition(car1Ride, time) };
}


function resetTime () {
  start = Date.now();
}


// Interface
module.exports.getCurrentCarsPosition = getCurrentCarsPosition;
module.exports.resetTime = resetTime;