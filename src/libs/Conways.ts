export class Conways {
  private canvasDom: HTMLCanvasElement | null;

  private context: CanvasRenderingContext2D | null;

  private size: number = 0;

  private unit: number = 10;

  constructor(element: HTMLElement, size: number) {
    this.canvasDom = document.createElement('canvas');
    this.context = this.canvasDom.getContext('2d');
    this.size = size;
    if (this.context) {
      this.canvasDom.style.width = '100%';
      this.canvasDom.style.height = '100%';
      this.canvasDom.width = this.size * this.unit;
      this.canvasDom.height = this.size * this.unit;
      this.context.fillStyle = 'black';
      this.context.fillRect(0, 0, this.canvasDom.width, this.canvasDom.height);
    }
    element.appendChild(this.canvasDom);
  }

  exceedBoader(x: number, y: number) {
    return x < 0 || x >= this.size || y < 0 || y >= this.size;
  }

  putCell(x: number, y: number) {
    if (!this.context) {
      return;
    }
    if (this.exceedBoader(x, y)) {
      return;
    }
    this.context.fillStyle = 'white';
    this.context.fillRect(
      x * this.unit,
      y * this.unit,
      1 * this.unit,
      1 * this.unit
    );
  }
}

export default {};
