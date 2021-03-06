import { Controller } from 'stimulus';
import { useDispatch, useDebounce } from 'stimulus-use';

export default class extends Controller {
  static targets = ['playButton', 'stopButton', 'currentTime'];
  static classes = ['completed'];
  static debounces = ['play', 'stop'];

  static values = {
    episode: Number,
    duration: String,
    currentTime: Number,
    mediaUrl: String,
    playUrl: String,
    playing: Boolean,
    completed: Boolean,
  };

  connect() {
    useDispatch(this);
    useDebounce(this, { wait: 500 });
  }

  play() {
    this.playingValue = true;
    this.dispatch('play', {
      episode: this.episodeValue,
      currentTime: this.currentTimeValue,
      playUrl: this.playUrlValue,
      mediaUrl: this.mediaUrlValue,
    });
  }

  stop() {
    this.playingValue = false;
    this.dispatch('stop');
  }

  start(event) {
    // episode is started from player
    const { episode } = event.detail;
    this.playingValue = episode === this.episodeValue;
  }

  close(event) {
    // episode is closed from player
    const { currentTime, episode, completed } = event.detail;
    if (episode === this.episodeValue) {
      this.playingValue = false;
      this.currentTimeValue = currentTime;
      this.completedValue = completed;
    }
  }

  update({ detail: { episode, timeRemaining, completed } }) {
    // server status update
    if (episode && episode === this.episodeValue) {
      if (timeRemaining && !completed) {
        this.currentTimeTarget.textContent = '~' + timeRemaining;
      } else {
        this.currentTimeValue = 0;
        this.currentTimeTarget.textContent = this.durationValue;
      }
      this.completedValue = completed;
    }
  }

  completedValueChanged() {
    if (this.hasCurrentTimeTarget) {
      if (this.completedValue) {
        this.currentTimeTarget.classList.add(this.completedClass);
      } else {
        this.currentTimeTarget.classList.remove(this.completedClass);
      }
    }
  }

  playingValueChanged() {
    if (this.hasPlayButtonTarget && this.hasStopButtonTarget) {
      if (this.playingValue) {
        this.playButtonTarget.classList.add('hidden');
        this.stopButtonTarget.classList.remove('hidden');
      } else {
        this.playButtonTarget.classList.remove('hidden');
        this.stopButtonTarget.classList.add('hidden');
      }
    }
  }
}
