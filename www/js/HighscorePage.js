class HighscorePage extends Component {
    constructor() {
        super();
        this.addRoute('/highscore', 'Highscore');
    }


    unmount() {
        this.table = '';
        this.message = '';
    }
    mount() {
        this.createHighscoreTable();
    }

    createHighscoreTable() {
        let list = [];
        JSON._load('highscore.json').then(function (winners) {
            if (winners.length > 0) {
                list = winners;
            } else {
                return;
            }
        });
        setTimeout(() => {

            if (list.length > 0) {

                let tableWrap = $('<div/>');
                let section = $('<section class="highscore-content container mt-5 mb-md-5 pt-4"></section>');
                let row = $('<div class="row"></div>');
                let table = $('<table class="highscore-list"/>');
                let thead = $('<tr><th>Rank</th><th>Namn</th><th>Drag</th></tr>');
                section.append(row.append(table.append(thead)));
                for (let i = 0; i < list.length; i++) {
                    let tr = $('<tr/>');

                    let winner = list[i];
                    let winnerRank = parseInt(i) + 1;
                    let winnerName = winner.name;
                    let winnerScore = winner.score;
                    tr.append(`<td>${winnerRank}</td><td>${winnerName}</td><td>${winnerScore} (${Math.round(winner.time) / 1000} s)</td>`);
                    table.append(tr);
                }
                tableWrap.append(section);
                this.table = tableWrap.get(0).innerHTML;
                this.render();

            } else {
                let messageWrap = $('<div/>');
                let message = $('<p class="hs-message">Highscore lista är tom! Spela och bli första vinnare!</p>');
                messageWrap.append(message);
                this.message = messageWrap.get(0).innerHTML;
                this.render();
            }
        }, 600);
    }
}