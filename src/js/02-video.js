import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function onPlay(e) {
  localStorage.setItem('videoplayer-current-time', e.seconds);
}

player.on('timeupdate', throttle(onPlay, 1000));

const timeSeconds = localStorage.getItem('videoplayer-current-time');
if (timeSeconds) {
  player.setCurrentTime(timeSeconds);
}
