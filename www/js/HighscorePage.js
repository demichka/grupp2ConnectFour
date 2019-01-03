class HighscorePage extends Component {
    constructor() {
        super();
        this.addRoute('/highscore', 'Highscore');
    }


    unmount() {
        this.table = '';
    }
    mount() {
        this.createHighscoreTable();
    }

    createHighscoreTable() {
        let list = [];
        JSON._load('highscore.json').then(function (winners) {
            list = winners;
        });

        setTimeout(() => {
            list = list.slice(0, 10);
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
                tr.append(`<td>${winnerRank}</td><td>${winnerName}</td><td>${winnerScore}</td>`);
                table.append(tr);
            }
            tableWrap.append(section);
            this.table = tableWrap.get(0).innerHTML;
            this.render();
        }, 300);
    }
}