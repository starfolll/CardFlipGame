class Bubble {
    constructor(size,color="rgba(255,255,255,0.1)") {
        this.size = size;
        this.color = color;
        this.px = Math.random() * innerWidth;
        this.py = Math.random() * innerHeight;

        this.dx = (Math.random() * 2 - 1) * 1.3;
        this.dy = (Math.random() * 2 - 1) * 1.3;

        this.fx = 0;
        this.fy = 0;
    }

    Show(ctx) {
        ctx.beginPath();
        ctx.ellipse(
            this.px,
            this.py,
            this.size,
            this.size,
            0,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = this.color;
        ctx.fill()
    }

    Update(mouseX, mouseY) {
        this.px += this.fx + this.dx * Math.sin(this.py / 100);
        this.py += this.fy + this.dy * Math.cos(this.px / 100);

        let x = this.px - mouseX;
        let y = this.py - mouseY;
        if (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) < this.size) {
            this.fx += x / 2;
            this.fy += y / 2;
        }

        this.fx *= 0.7;
        this.fy *= 0.7;

        if (this.px > window.innerWidth + this.size * 2) {
            this.px = -this.size * 2;
        } else if (this.px < -this.size * 2) {
            this.px = window.innerWidth + this.size * 2;
        }
        if (this.py > window.innerHeight + this.size * 2) {
            this.py = -this.size * 2;
        } else if (this.py < -this.size * 2) {
            this.py = window.innerHeight + this.size * 2;
        }
    }
}