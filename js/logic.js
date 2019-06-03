let GAME_BOARD;

TextPrinter.PrintWidthDelay(
    document.getElementById("wonAlert"),
    "[ Start ]",
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

    GAME_BOARD = new GameBoard(8, 5);
};

