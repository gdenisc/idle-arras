export class Mouse {
	x = 0;
	y = 0;
	left = false;
	leftClick = false;
	leftRelease = false;
	right = false;

	move(ev: MouseEvent) {
		const dpi = window.devicePixelRatio;
		this.x = ev.clientX * dpi;
		this.y = ev.clientY * dpi;
	}

	down(ev: MouseEvent) {
		switch (ev.button) {
			case 0:
				this.left = true;
				this.leftClick = true;
				break;
			case 2:
				this.right = true;
				break;
		}
	}

	up(ev: MouseEvent) {
		switch (ev.button) {
			case 0:
				this.left = false;
				this.leftRelease = true;
				break;
			case 2:
				this.right = false;
				break;
		}
	}

	resetClicks() {
		this.leftClick = false;
		this.leftRelease = false;
	}
}

export const mouse = new Mouse();

window.addEventListener('mousemove', e => mouse.move(e));
window.addEventListener('mousedown', e => mouse.down(e));
window.addEventListener('mouseup', e => mouse.up(e));
