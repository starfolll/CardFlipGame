class BubbleAnimation extends Animation {
    constructor(
        bubblesCount = 10,
        bubblesMinSize = 30,
        bubblesMaxSize = 70
    ) {
        super();

        this.bubblesCount = bubblesCount;
        this.bubblesMinSize = bubblesMinSize;
        this.bubblesMaxSize = bubblesMaxSize;

        this.bubbles = [];

        for (let i = 0; i < this.bubblesCount; i++) {
            this.bubbles.push(new Bubble(
                (Math.random() * (bubblesMaxSize - bubblesMinSize)) + bubblesMinSize
            ));
        }

        this.mouseX = 0;
        this.mouseY = 0;

        document.onmousemove = e => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        };
    }

    Play(ctx) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.bubbles.forEach(b => {
            b.Show(ctx);
            b.Update(this.mouseX, this.mouseY);
        });
    }
}