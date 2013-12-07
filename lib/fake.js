var cars = {}
  , start = Date.now()
  , car1Ride = []
  , car2Ride = []
  , timeExpander = 4
  , banana1 = {}
  , banana2 = {}
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


banana1.drop = 3.5 * 1000 * timeExpander;
banana1.slip = 7 * 1000 * timeExpander;
banana1.lat = 37.56909;
banana1.lon = -122.327047;
banana1.droppedBy = { id: 1234, name: 'Clement' }

banana2.drop = 8.5 * 1000 * timeExpander;
banana2.slip = 13.6 * 1000 * timeExpander;
banana2.lat = 37.568299;
banana2.lon = -122.328152;
banana2.droppedBy = { id: 99, name: 'Mike' }



  
function getCarPosition (ride, time) {
  var res, i, current, next, i0 = 0, alpha;

  for (i = 0; i < ride.length; i += 1) {
    if (time >= ride[i].time) {
      i0 = i
    }
  }
  
  // Hack
  current = ride[i0];
  next = ride[i0+1];
  try {
    alpha = (time - current.time) / (next.time - current.time);
    if (alpha < 0) {alpha = 0; }
    if (alpha > 1) {alpha = 1; }
    res = { lat: alpha * next.lat + (1 - alpha) * current.lat, lon: alpha * next.lon + (1 - alpha) * current.lon };    
  } catch(e) {
    res = current;
  }

  return res;
}

function getCurrentCarsPositions () {
  var time = Date.now() - start;
  
  return { car1: getCarPosition(car1Ride, time), car2: getCarPosition(car2Ride, time) };
}


function getCurrentBananasPositions () {
  var time = Date.now() - start
    , bananas = [];

  if (time >= banana1.drop && time <= banana1.slip) {
    bananas.push({ lat: banana1.lat, lon: banana1.lon, droppedBy: banana1.droppedBy });
  }

  if (time >= banana2.drop && time <= banana2.slip) {
    bananas.push({ lat: banana2.lat, lon: banana2.lon, droppedBy: banana2.droppedBy });
  }
  
  return bananas;
}


function getCurrentEventLog() {
  var time = Date.now() - start
    , eventLog = []
    ;
    
  if (time >= banana1.drop) {
    eventLog.push({ type: "BANANA_PEEL_DROPPED"
                  , timestamp: new Date(start + banana1.drop)
                  , byUser: { id: 1234, name: "Clement" }
                  , additionalData: {}    
    });
  }
  
  if (time >= banana1.slip) {
    eventLog.push({ type: "SLIPPED_ON_BANANA_PEEL"
                  , timestamp: new Date(start + banana1.slip)
                  , byUser: { id: 1234, name: "Mike" }
                  , additionalData: { droppedBy: { id: 1234, name: "Clement" } }    
    });
  }
  
  if (time >= banana2.drop) {
    eventLog.push({ type: "BANANA_PEEL_DROPPED"
                  , timestamp: new Date(start + banana2.drop)
                  , byUser: { id: 1234, name: "Mike" }
                  , additionalData: {}    
    });
  }
  
  if (time >= banana2.slip) {
    eventLog.push({ type: "SLIPPED_ON_BANANA_PEEL"
                  , timestamp: new Date(start + banana2.slip)
                  , byUser: { id: 1234, name: "Clement" }
                  , additionalData: { droppedBy: { id: 1234, name: "Mike" } }    
    });
  }  
  
  return eventLog;
}



function resetTime () {
  start = Date.now() + (3 * 1000 * timeExpander);
}


// Interface
module.exports.getCurrentCarsPositions = getCurrentCarsPositions;
module.exports.getCurrentBananasPositions = getCurrentBananasPositions;
module.exports.getCurrentEventLog = getCurrentEventLog;
module.exports.resetTime = resetTime;