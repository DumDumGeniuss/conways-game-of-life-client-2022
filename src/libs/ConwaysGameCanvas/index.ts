import { CleanBoard, CleanCell, Player } from './types';

export type ReviveCellHandler = (x: number, y: number) => any;

export class ConwaysGameCanvas {
  private canvasDom: HTMLCanvasElement | null;

  private context: CanvasRenderingContext2D | null;

  private size: number = 0;

  private unit: number = 100;

  private board: CleanBoard = [];

  private player: Player | null = null;

  private onReviveCell: ReviveCellHandler;

  constructor(
    element: HTMLElement,
    size: number,
    board: CleanBoard,
    player: Player,
    onReviveCell: ReviveCellHandler
  ) {
    this.size = size;
    this.setBoard(board);
    this.setPlayer(player);
    this.onReviveCell = onReviveCell;
    this.canvasDom = document.createElement('canvas');
    this.context = this.canvasDom.getContext('2d');
    if (this.context) {
      this.canvasDom.style.width = '100%';
      this.canvasDom.style.height = '100%';
      this.canvasDom.width = this.size * this.unit;
      this.canvasDom.height = this.size * this.unit;
      this.context.fillStyle = 'black';
      this.context.fillRect(0, 0, this.canvasDom.width, this.canvasDom.height);
      this.canvasDom.addEventListener(
        'click',
        this.handleCanvasClick.bind(this)
      );
    }
    element.appendChild(this.canvasDom);
  }

  private handleCanvasClick(e: MouseEvent) {
    if (!this.canvasDom) {
      return;
    }
    if (!this.player) {
      return;
    }
    const rect = this.canvasDom.getBoundingClientRect();
    const ratio = this.canvasDom.width / rect.width;
    const realX = e.clientX - rect.left;
    const realY = e.clientY - rect.top;
    const x = Math.floor((realX * ratio) / this.unit);
    const y = Math.floor((realY * ratio) / this.unit);

    if (!this.board[x][y].live) {
      this.reviveCel(x, y);
    }
  }

  private exceedBoader(x: number, y: number) {
    return x < 0 || x >= this.size || y < 0 || y >= this.size;
  }

  setPlayer(p: Player) {
    this.player = p;
  }

  setBoard(b: CleanBoard) {
    this.board = b;
    for (let i = 0; i < b.length; i += 1) {
      for (let j = 0; j < b[i].length; j += 1) {
        this.drawCell(i, j);
      }
    }
  }

  setCell(x: number, y: number, cell: CleanCell) {
    this.board[x][y] = cell;
    this.drawCell(x, y);
  }

  reviveCel(x: number, y: number) {
    if (!this.player) {
      return;
    }
    this.board[x][y].live = true;
    this.board[x][y].color = this.player.color;
    this.drawCell(x, y);
    this.onReviveCell(x, y);
  }

  private drawCell(x: number, y: number) {
    if (!this.context) {
      return;
    }
    if (this.exceedBoader(x, y)) {
      return;
    }
    const cell = this.board[x][y];
    this.context.fillStyle = cell.color;
    this.context.fillRect(
      x * this.unit,
      y * this.unit,
      1 * this.unit,
      1 * this.unit
    );
  }
}

export default {};