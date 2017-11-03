import express from 'express';
import fs from 'fs';
import childProcess from 'child_process';
const exec = childProcess.exec;

// express
var app = express();

// static
app.use('/static', express.static('dist'));


//// content

// root
app.get('/', (req, res) => {
  app.set('views', './dist');
  app.set('view engine', 'ejs');
  app.engine('html', require('ejs').renderFile);

  console.log("/root");
  res.render('index.html');
});

// scssdvx
app.get('/scssdvx', (req, res) => {
  app.set('views', 'src/view');
  app.set('view engine', 'ejs');

  var params = {};
  res.render('main', params);
});


//// api

// get track
app.get('/api/track/list', (req, res) => {
  const level = req.query.level;
  const word = req.query.word;
  const limit = req.query.limit;
  const levels = [15, 16, 17, 18, 19, 20];
  if (!level || !levels.includes(parseInt(level))) {
    res.send('{}');
    return;
  }

  const trackJsonPath = 'private/data/'+ level +'.json';
  const tracks = JSON.parse(fs.readFileSync(trackJsonPath, 'utf8'));

  let matchedTrackList = [];
  for (const key in tracks) {
    const track = tracks[key];
    if (word && !track.name.toLowerCase().includes(word.toLowerCase())) continue;

    matchedTrackList.push(
      {
        "id": track.id,
        "name": track.name + ' [' + track.difficulty + ']',
        "level": track.level,
        "difficulty": track.difficulty,
        "ver": track.ver,
        "path":track.path
      }
    );
  }
  if (limit) matchedTrackList.slice(0, limit);

  res.send(JSON.stringify(matchedTrackList));
});

// update track
app.get('/api/track/update', (req, res) => {
  const COMMAND = 'python private/bin/sdvxFumen.py';
  exec(COMMAND, function(error, stdout, stderr) {
    if (error) {
      res.send('exec error : ' + error);
      return;
    }
  });
  res.send('track update done');
});

// get weekly
app.get('/api/track/weekly', (req, res) => {
  const weeklyTrackJsonPath = 'private/data/weekly.json';
  res.send(fs.readFileSync(weeklyTrackJsonPath, 'utf8'));
});

// update weekly
app.get('/api/track/weekly/update', (req, res) => {
  const weeklyTracks = [];

  const levels = [15, 16, 17, 18, 19, 20];
  for (const key in levels) {
    const level = levels[key];

    const trackJsonPath = 'private/data/'+ level +'.json';
    const tracks = JSON.parse(fs.readFileSync(trackJsonPath, 'utf8'));
  
    let trackList = [];
    for (const key in tracks) {
      const track = tracks[key];
      trackList.push(
        {
          "id": track.id,
          "name": track.name + ' [' + track.difficulty + ']',
          "level": track.level,
          "difficulty": track.difficulty,
          "ver": track.ver,
          "path":track.path
        }
      );
    }

    const track = trackList[Math.floor(trackList.length * Math.random())];
    weeklyTracks.push(track);
  }

  const weeklyTrackJsonPath = 'private/data/weekly.json';
  fs.writeFile(weeklyTrackJsonPath, JSON.stringify(weeklyTracks), function(error, stdout, stderr) {
    if (error) {
      res.send('write file error : ' + error);
      return;
    }
  });

  res.send('track weekly update done');
});


//// server
app.listen(3000, () => {
  console.log('Express listening on port 3000!');
});