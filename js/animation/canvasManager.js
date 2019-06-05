class CanvasManager {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.canvasWidth = width;
        this.canvasHeight = height;

        this.SetCanvasSize(width, height);
        this.SetResizeEventListener();

        this.animations = [];
    }

    SetCanvasSize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;

        this.canvas.width = width;
        this.canvas.height = height;
    }

    SetResizeEventListener() {
        window.onresize = e => this.SetCanvasSize(window.innerWidth, window.innerHeight);
    }

    AddAnimation(animationClass)     {
        this.animations.push(animationClass);
    }

    PlayAnimations() {
        requestAnimationFrame(() => {
            this.animations.forEach(a => a.Play(this.ctx));
            this.PlayAnimations();
        });
    }
}