import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function ({ seconds }) {
    localStorage.setItem('videoplayer-current-time', seconds);
  }, 1000)
);

const savedTime = localStorage.getItem('videoplayer-current-time');

if (savedTime !== null) {
  player.setCurrentTime(parseFloat(savedTime));
}

player.on('ended', function () {
  localStorage.removeItem('videoplayer-current-time');
});
