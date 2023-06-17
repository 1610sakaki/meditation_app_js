const song = document.querySelector('.song');
const play = document.querySelector('.play');
const replay = document.querySelector('.replay');
const outline = document.querySelector('moving-outline circle');
const video = document.querySelector('.vid-container video');

//音楽
const sounds = document.querySelectorAll('.sound-picker button');
//時間表示
const timeDisplay = document.querySelector('.time-display');
//終了までの時間
const outlineLength = outline.getTotalLength();
//測定期間
const timeSelect = document.querySelectorAll('.time-select button');
let fakeDuration = 600;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
  fakeDuration % 60
)}`;

sounds.forEach((sound) => {
  sound.addEventListener('click', function () {
    song.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    checkPlaying(song);
  });
});

//音楽の再生
play.addEventListener('click', () => {
  checkPlaying(song);
});

replay.addEventListener('click', function () {
  restartSong(song);
});

const restartSong = (song) => {
  let currentTime = song.currentTime;
  song.currentTime = 0;
  console.log('ciao');
};

timeSelect.forEach((option) => {
  option.addEventListener('click', function () {
    fakeDuration = this.getAttribute('data-time');
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
      fakeDuration % 60
    )}`;
  });
});

const checkPlaying = (song) => {
  if (song.paused) {
    song.play();
    video.play();
    play.src = './svg/pause.svg';
  } else {
    song.pause();
    video.pause();
    play.src = './svg/play.svg';
  }
};

//アニメーション
song.ontimeupdate = () => {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);
  timeDisplay.textContent = `${minutes}:${seconds}`;
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;
  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = './svg/play.svg';
    video.pause();
  }
};
