var express = require('express')
  , app = express()
  , config = require('./lib/config')
  , fake = require('./lib/fake')
  ;
  
app.use(express.bodyParser());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  return next();
});
app.use(app.router); // Map routes


app.get('/su/mariokart/api/leaderboard', function (req, res, next) {
  var leaderboard = []
  
  leaderboard.push({ user: { id: 1111, name: "Louis" }, score: 72 });
  leaderboard.push({ user: { id: 1234, name: "Yohan" }, score: 156 });
  leaderboard.push({ user: { id: 99, name: "Mike" }, score: 45 });

  return res.json(leaderboard);
});


app.get('/su/mariokart/api/lastEvents', function (req, res, next) {
  var events = fake.getCurrentEventLog();
  
  // events.push({ type: "BANANA_PEEL_DROPPED"
              // , timestamp: new Date(2013, 11, 6, 10, 25, 36)
              // , byUser: { id: 1234, name: "Yohan" }
              // , additionalData: {}
              // });

  // events.push({ type: "BANANA_PEEL_DROPPED"
              // , timestamp: new Date(2013, 11, 6, 10, 52, 10)
              // , byUser: { id: 1234, name: "Yohan" }
              // , additionalData: {}
              // });

  // events.push({ type: "SLIPPED_ON_BANANA_PEEL"
              // , timestamp: new Date(2013, 11, 6, 11, 8, 54)
              // , byUser: { id: 1111, name: "Louis" }
              // , additionalData: { droppedBy: { id: 1234, name: "Yohan" } }
              // });              

  return res.json(events);
});


app.get('/su/mariokart/api/bananaPeelsPositions', function (req, res, next) {
  var positions = fake.getCurrentBananasPositions();
                
  return res.json(positions);
});


app.get('/su/mariokart/api/carsPositions', function (req, res, next) {
  var positions = []
    , carPos = fake.getCurrentCarsPositions()
    ;
  
  positions.push({ lat: carPos.car2.lat
                 , lon: carPos.car2.lon
                 , driver: { id: 99, name: 'Mike' }
                 });
                 
  positions.push({ lat: carPos.car1.lat
                 , lon: carPos.car1.lon
                 , driver: { id: 998, name: 'Clement' }
                 });                
                
  return res.json(positions);
});


app.get('/su/mariokart/api/resetTime', function(req, res, next) {
  fake.resetTime();
  return res.json({ success: true });
});



app.listen(config.svPort);