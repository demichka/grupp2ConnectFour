class HighscorePage extends Component {
    constructor() {
        super();
        this.addRoute('/highscore', 'Highscore');
        this.active = true;
        this.creatingTable = this.createHighscoreTable();
    }

    // getRanks() {
    //     this.winnerList.then(function(winners){
    //         let rank = 1;
    //         for (let i = 0; i < winners.length; i++) {
    //         winners[i].rank = rank;
    //         }
    //         rank++;
    //     });
    // }
    unmount() {
        this.creatingTable = '';
        this.active = false;
        console.log('unmount', this.active);
      }


    createHighscoreTable() {
        console.log('open again', this.active);
        if (this.active) {
            let list = [];
        JSON._load('highscore.json').then(function(winners){
            list = winners;
        });  
        console.log(list, 'first');      
        setTimeout(() => {
        console.log(list, 'list-winners');
        let tableWrap = $('<div/>');
        let table = $('<table class="highscore-list"/>');
        let thead = $('<tr><th>Rank</th><th>Namn</th><th>Drag</th></tr>');
        table.append(thead);
        for (let i = 0; i < list.length; i++) {
             let tr = $('<tr/>');

            let winner = list[i];
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
        else {
            console.log(this.active);
        }
    }
}