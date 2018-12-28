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
        console.log(list, 'first');

        setTimeout(() => {
            let cleanedFromDuplicates = list.filter((user, index, self) =>
                index === self.findIndex((next) => (
                    next.score === user.score
                ))
            );
            console.log(cleanedFromDuplicates, 'cleaned');
            console.log(cleanedFromDuplicates, 'list-winners');
            cleanedFromDuplicates = cleanedFromDuplicates.slice(0, 10);
            let tableWrap = $('<div/>');
            let table = $('<table class="highscore-list"/>');
            let thead = $('<tr><th>Rank</th><th>Namn</th><th>Drag</th></tr>');
            table.append(thead);
            for (let i = 0; i < cleanedFromDuplicates.length; i++) {
                let tr = $('<tr/>');

                let winner = cleanedFromDuplicates[i];
                console.log(winner, 'winner');
                let winnerRank = parseInt(i) + 1;
                let winnerName = winner.name;
                let winnerScore = winner.score;
                tr.append(`<td>${winnerRank}</td><td>${winnerName}</td><td>${winnerScore}</td>`);
                table.append(tr);
            }
            tableWrap.append(table);
            console.log(tableWrap);
            this.table = tableWrap.get(0).innerHTML;
            console.log(this.table, 'I am ready!');
            this.render();
        }, 500);
    }
}