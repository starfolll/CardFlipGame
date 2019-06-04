class GameBoard {
    constructor(columns, rows) {
        this.startTime = new Date();
        this.columns = columns;
        this.rows = rows;
        this.cards = [];
        this.flippedCards = [];
        this.hideDelay = 2000;
        this.gameBoargNode = document.getElementById("gameBoard");
        this.maxFlippedCard = 2;
        this.currentFlippedCard = 0;
        this.cardsCount = this.columns * this.rows;
        this.cardsLocked = 0;
        this.flips = 0;
        this.isGaming = false;

        this.wonWindow = document.getElementById("wonGameWindow");
        this.wonAlert = document.getElementById("wonAlert");

        document.documentElement.style
            .setProperty('--game_board_rows', rows);
        document.documentElement.style
            .setProperty('--game_board_columns', columns);

        for (let i = 0; i < rows * columns / this.maxFlippedCard; i++) {
            let cardInner = cardChars[Math.random() * cardChars.length | 0];

            for (let j = 0; j < this.maxFlippedCard; j++) {
                let newCard = new Card(cardInner.text, cardInner.color);

                this.AddCardFlipRule(newCard);

                this.cards.push(newCard);

                setTimeout(() => {
                    newCard.cardNode.setAttribute("class", "card");
                    this.isGaming = true;
                }, this.hideDelay);
            }
        }

        ScoreBoard.HideHighScore();
        this.Shuffle();
        this.scoreAnimation = setInterval(() => this.ShowGameScore(), 30);
    }

    AddCard(node) {
        this.gameBoargNode.appendChild(node);
    }

    Shuffle() {
        let cards = this.cards;
        let cardsSave = [];
        this.ClearBoard();

        for (let i = cards.length - 1; i >= 0; i--) {
            let card = cards.splice(Math.floor(Math.random() * cards.length), 1)[0];
            this.AddCard(card.cardNode);
            cardsSave.push(card);
        }

        this.cards = cardsSave;
    }

    ClearBoard() {
        for (let i = this.gameBoargNode.children.length - 1; i >= 0; i--) {
            this.gameBoargNode.removeChild(this.gameBoargNode.children[0]);
        }
    }

    AddCardFlipRule(card) {
        card.cardNode.onclick = () => {
            if (this.isGaming && !card.isFlipped && this.maxFlippedCard > this.currentFlippedCard++) {
                this.flips++;
                card.Flip();
                this.flippedCards.push(card);

                if (this.maxFlippedCard === this.currentFlippedCard) {
                    setTimeout(() => this.CheckFlippedCards(), 700);
                }
            }
        }
    }

    CheckFlippedCards() {
        let coincidence = true;
        let lastNum = this.flippedCards[0].num;

        for (let i = 0; i < this.flippedCards.length; i++) {
            coincidence = lastNum === this.flippedCards[i].num;
            if (coincidence) {
                lastNum = this.flippedCards[i].num;
            } else {
                break;
            }
        }

        if (!coincidence) {
            this.flippedCards.forEach(c => c.FlipBack());
        } else {
            this.flippedCards.forEach(c => c.Lock());
            this.cardsLocked += this.maxFlippedCard;
            this.CheckForWin();
        }

        this.flippedCards = [];
        this.currentFlippedCard = 0;
    }

    CheckForWin() {
        for (let i = 0; i < this.cards.length; i++) {
            if (!this.cards[i].isFlipped) {
                return;
            }
        }

        this.wonWindow.style.visibility = null;
        this.wonWindow.style.background = "rgba(0, 0, 0, 0.8)";
        TextPrinter.PrintWidthDelay(this.wonAlert, "[ Play again ? ]", 30, "<div></div>");
        ScoreBoard.UpdateHighScore(ScoreBoard.CompareTime(this.startTime, new Date()), this.flips);
        ScoreBoard.DisplayHighScore(30);
        this.ShowGameScore();
        clearInterval(this.scoreAnimation);

        this.cards.forEach(c => {
            TextPrinter.RemoveCharactersWidthDelay(c.cardNode, Math.random() * 1000);
        });

        this.wonAlert.onclick = () => {
            this.wonWindow.style.visibility = "hidden";
            this.wonWindow.style.background = "rgba(0, 0, 0, 0)";
            TextPrinter.RemoveCharactersWidthDelay(this.wonAlert, 30);

            GAME_BOARD = new GameBoard(this.columns, this.rows);
        };
    }

    ShowGameScore() {
        let time = ScoreBoard.CompareTime(this.startTime, new Date());
        let t =
            (!!time.hours ? (("" + time.hours).length === 1 ? "0" + time.hours : time.hours) + ":" : "") +
            (!!time.minutes ? (("" + time.minutes).length === 1 ? "0" + time.minutes : time.minutes) + ":" : "") +
            (("" + time.seconds).length === 1 ? "0" + time.seconds : time.seconds);
        ScoreBoard.DisplayGameScore(
            t,
            this.flips,
            `${this.cardsLocked}/${this.cardsCount}`,
        );
    }
}