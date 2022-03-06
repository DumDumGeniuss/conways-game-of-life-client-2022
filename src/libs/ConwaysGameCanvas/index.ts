import { CleanBoard, CleanCell, Player, PlayersMap } from './types';

export type ReviveCellHandler = (x: number, y: number) => any;
export type KillCellHandler = (x: number, y: number) => any;

export class ConwaysGameCanvas {
  private canvasDom: HTMLCanvasElement | null;

  private context: CanvasRenderingContext2D | null;

  private size: number = 0;

  private unit: number = 100;

  private board: CleanBoard = [];

  private currentPlayerId: string;

  private playersMap: PlayersMap = {};

  private onReviveCell: ReviveCellHandler;

  private onKillCell: KillCellHandler;

  constructor(
    element: HTMLElement,
    size: number,
    board: CleanBoard,
    player: Player,
    players: Player[],
    onReviveCell: ReviveCellHandler,
    onKillCell: KillCellHandler
  ) {
    this.size = size;
    this.setBoard(board);
    this.currentPlayerId = player.id;
    this.setPlayers(players);
    this.onReviveCell = onReviveCell;
    this.onKillCell = onKillCell;
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
    if (!this.playersMap[this.currentPlayerId]) {
      return;
    }
    const rect = this.canvasDom.getBoundingClientRect();
    const ratio = this.canvasDom.width / rect.width;
    const realX = e.clientX - rect.left;
    const realY = e.clientY - rect.top;
    const x = Math.floor((realX * ratio) / this.unit);
    const y = Math.floor((realY * ratio) / this.unit);

    if (this.board[x][y].live) {
      const succeed = this.killCell(x, y, this.currentPlayerId);
      if (succeed) {
        this.onKillCell(x, y);
      }
    } else {
      const succeed = this.reviveCell(x, y, this.currentPlayerId);
      if (succeed) {
        this.onReviveCell(x, y);
      }
    }
  }

  private exceedBoader(x: number, y: number) {
    return x < 0 || x >= this.size || y < 0 || y >= this.size;
  }

  setPlayers(ps: Player[]) {
    ps.forEach((p) => {
      this.addPlayer(p);
    });
  }

  addPlayer(p: Player) {
    this.playersMap[p.id] = p;
  }

  removePlayer(playerId: string) {
    delete this.playersMap[playerId];
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

  reviveCell(x: number, y: number, playerId: string): boolean {
    if (!this.playersMap[playerId]) {
      return false;
    }
    this.board[x][y].live = true;
    this.board[x][y].color = this.playersMap[playerId].color;
    this.drawCell(x, y);

    return true;
  }

  killCell(x: number, y: number, playerId: string): boolean {
    if (!this.playersMap[playerId]) {
      return false;
    }
    if (this.board[x][y].playerIds.indexOf(playerId) === -1) {
      return false;
    }
    console.log('hi');
    this.board[x][y].live = false;
    this.board[x][y].color = '#000000';
    this.board[x][y].playerIds = [];
    this.drawCell(x, y);

    return true;
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
