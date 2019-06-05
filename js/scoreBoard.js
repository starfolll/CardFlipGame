class ScoreBoard {
    static nodes = {
        highScore: {
            box: document.getElementById("highScoreBox"),
            head: document.getElementById("highScoreHead"),
            time: document.getElementById("highScoreTime"),
            flips: document.getElementById("highScoreFlips")
        },
        gameScore: {
            box: document.getElementById("gameScoreBox"),
            head: document.getElementById("gameScoreHead"),
            time: document.getElementById("gameScoreTime"),
            flips: document.getElementById("gameScoreFlips"),
            cards: document.getElementById("gameScoreCardsLeft")
        }
    };

    static UpdateHighScore(time, flips) {
        let highScore = ScoreBoard.GetHighScore();
        let t =
            (!!time.hours ? (("" + time.hours).length === 1 ? "0" + time.hours : time.hours) + ":" : "") +
            (!!time.minutes ? (("" + time.minutes).length === 1 ? "0" + time.minutes : time.minutes) + ":" : "") +
            (("" + time.seconds).length === 1 ? "0" + time.seconds : time.seconds);

        console.log(t);
        if (!!highScore) {
            if (flips < +highScore.flips) {
                ScoreBoard.SetHighScores(t, flips);
            }
        }else{
            ScoreBoard.SetHighScores(t, flips);
        }
    }

    static GetHighScore() {
        let scoreBoard = {};
        scoreBoard["time"] = localStorage.getItem("time");
        scoreBoard["flips"] = localStorage.getItem("flips");

        if (!!scoreBoard["flips"]) {
            return scoreBoard;
        } else {
            return null;
        }
    }

    static SetHighScores(time, flips) {
        localStorage.setItem("time", "" + time);
        localStorage.setItem("flips", "" + flips);
    }

    static HideGameScore() {
        ScoreBoard.nodes.gameScore.box.style.display = "none";
    }

    static HideHighScore() {
        ScoreBoard.nodes.highScore.box.style.display = "none";
    }

    static DisplayGameScore(time, flips, cards) {
        ScoreBoard.nodes.gameScore.box.style.display = null;
        ScoreBoard.nodes.gameScore.head.innerText = `_.Score._`;
        ScoreBoard.nodes.gameScore.time.innerText = `[ Time: ${time}`;
        ScoreBoard.nodes.gameScore.flips.innerText = `! Flips: ${flips}`;
        ScoreBoard.nodes.gameScore.cards.innerText = `[ Cards: ${cards}`;
    }

    static DisplayHighScore(textDelay = 30) {
        let score = ScoreBoard.GetHighScore();

        if (!!score) {
            ScoreBoard.nodes.highScore.box.style.display = null;

            TextPrinter.PrintWidthDelay(
                ScoreBoard.nodes.highScore.head,
                "_.High score._",
                textDelay
            );

            TextPrinter.PrintWidthDelay(
                ScoreBoard.nodes.highScore.time,
                `[ Time: ${score.time}`,
                textDelay
            );

            TextPrinter.PrintWidthDelay(
                ScoreBoard.nodes.highScore.flips,
                `! Flips: ${score.flips}`,
                textDelay
            );
        } else {
            ScoreBoard.nodes.highScore.box.style.display = "none";
        }
    }

    static CompareTime(timeOld, timeNow) {
        let retDict = {};

        let seconds = (timeNow.getTime() - timeOld.getTime()) / 1000 | 0;
        retDict["seconds"] = seconds % 60;

        if (seconds > 59) {
            let minutes = seconds / 60 | 0;
            retDict["minutes"] = minutes % 60;

            if (minutes > 59) {
                let hours = minutes / 60 | 0;
                retDict["hours"] = hours % 60;
            }
        }

        return retDict;
    }
}