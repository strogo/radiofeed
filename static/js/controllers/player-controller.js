import axios from 'axios';
import { Controller } from 'stimulus';
import { useDispatch } from 'stimulus-use';

export default class extends Controller {
  // handles interaction of player and individual episodes
  static values = {
    episode: String,
    stopUrl: String,
  };

  connect() {
    useDispatch(this);
  }

  async open(event) {
    const { stopUrl, playUrl, episode } = event.detail;

    this.episodeValue = episode;
    this.stopUrlValue = stopUrl;

    const response = await axios.post(playUrl);
    this.element.innerHTML = response.data;
  }

  close(event) {
    if (this.stopUrlValue) {
      axios.post(this.stopUrlValue);
    }
    this.element.innerHTML = '';
    this.episodeValue = '';
    this.stopUrlValue = '';
  }

  stop() {
    this.dispatch('close', { episode: this.episode });
    this.close();
  }
}
