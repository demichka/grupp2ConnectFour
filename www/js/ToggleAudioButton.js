class ToggleAudioButton extends Component {
    constructor(board, audio) {
        super();
        this.board = board;
        this.audio = audio;
        this.addEvents({
            'click .audio-muted': 'unmuteAudio',
            'click .audio-unmuted': 'muteAudio'
        });
    }

    muteAudio() {
        this.audio.volume = 0;
        this.on = false;
        this.board.page.volume = this.on;
        this.render();
    }
    unmuteAudio() {
        this.audio.volume = 0.5;
        this.on = true;
        this.board.page.volume = this.on;
        this.render();
    }
}