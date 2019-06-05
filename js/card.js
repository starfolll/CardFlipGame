class Card {
    constructor(num, textColor){
        this.num = num;
        this.isFlipped = false;

        this.cardNode = document.createElement("div");
        this.cardNode.setAttribute("class", "card card_opened card_locked");
        this.cardNode.style.color = textColor;
        this.cardNode.style.textShadow = `0 0 10px ${textColor}`;
        this.cardNode.innerHTML = this.num;
    }

    Flip(){
        this.isFlipped = true;
        this.cardNode.setAttribute("class", "card card_opened");
    }

    FlipBack(){
        this.isFlipped = false;
        this.cardNode.setAttribute("class", "card");
    }

    Lock(){
        this.isFlipped = true;
        this.cardNode.setAttribute("class", "card card_opened card_locked");
    }
}