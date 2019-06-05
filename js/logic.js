let GAME_BOARD;

let CANVAS_MANAGER = new CanvasManager(
    document.getElementById("animation"),
    window.innerWidth,
    window.innerHeight
);
CANVAS_MANAGER.AddAnimation(new BubbleAnimation(20));
CANVAS_MANAGER.SetResizeEventListener();
CANVAS_MANAGER.PlayAnimations();

ScoreBoard.HideGameScore();
ScoreBoard.DisplayHighScore();

TextPrinter.PrintWidthDelay(
    document.getElementById("wonAlert"),
    "[ Play ]",
    30,
    "<div></div>"
);

document.getElementById("wonAlert").onclick = () => {
    TextPrinter.RemoveCharactersWidthDelay(
        document.getElementById("wonAlert"),
        30
    );

    document.getElementById("wonGameWindow").style.visibility = "hidden";
    document.getElementById("wonGameWindow").style.background = "rgba(0,0,0,0)";

    GAME_BOARD = new GameBoard(8, 5, 2);
};