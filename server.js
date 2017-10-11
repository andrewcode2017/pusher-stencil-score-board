require('dotenv').config();
const Pusher = require('pusher');

const { PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET, TIME } = process.env;

const pusher = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: 'eu',
  encrypted: true
});

let multiplier = 1;
const interval = setInterval(() => {
  const scores = {
    1: {chelsea: 0, arsenal: 1},
    2: {chelsea: 1, arsenal: 1},
    3: {chelsea: 2, arsenal: 1},
    4: {chelsea: 2, arsenal: 2},
    5: {chelsea: 3, arsenal: 2},
    6: 'Match End'
  }
  multiplier = multiplier + 1;
  const scoreId = multiplier-1;

  if (multiplier > 6) {
    console.log('clearing');
    clearInterval(interval);
  }
  
  console.log(scores[scoreId]);
  pusher.trigger('soccer', 'scores', scores[scoreId]);
}, multiplier * TIME);
