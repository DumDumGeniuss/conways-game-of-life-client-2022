import { forwardRef, useRef, useState, useImperativeHandle } from 'react';
import {
  ConwaysGameCanvas,
  ReviveCellHandler,
  KillCellHandler,
} from '@/libs/ConwaysGameCanvas';
import { CleanBoard, CleanCell, Player } from '@/libs/ConwaysGameCanvas/types';

type Props = {
  onReviveCell: ReviveCellHandler;
  onKillCell: KillCellHandler;
};

export type ConwaysBoardCommands = {
  startGame: (
    size: number,
    board: CleanBoard,
    player: Player,
    players: Player[]
  ) => any;
  updateBoard: (board: CleanBoard) => any;
  updateCell: (x: number, y: number, cell: CleanCell) => any;
  addPlayer: (p: Player) => void;
  removePlayer: (playerId: string) => void;
};

const ConwaysBoard = forwardRef<ConwaysBoardCommands, Props>(
  ({ onReviveCell, onKillCell }, ref) => {
    const conwayBoardRef = useRef<HTMLDivElement | null>(null);
    const [conwayBoard, setConwayBoard] = useState<ConwaysGameCanvas | null>(
      null
    );

    // These methods are accessible by the parent components.
    useImperativeHandle(ref, () => ({
      startGame(size: number, b: CleanBoard, p: Player, ps: Player[]) {
        if (!conwayBoardRef.current) {
          return;
        }
        const conwayBoardDom = conwayBoardRef.current;
        const newBoard = new ConwaysGameCanvas(
          conwayBoardDom,
          size,
          b,
          p,
          ps,
          onReviveCell,
          onKillCell
        );
        setConwayBoard(newBoard);
      },
      updateBoard(b: CleanBoard) {
        conwayBoard?.setBoard(b);
      },
      updateCell(x: number, y: number, cell: CleanCell) {
        conwayBoard?.setCell(x, y, cell);
      },
      addPlayer(p: Player) {
        conwayBoard?.addPlayer(p);
      },
      removePlayer(playerId: string) {
        conwayBoard?.removePlayer(playerId);
      },
    }));

    return <div ref={conwayBoardRef} className="w-full h-full" />;
  }
);

export default ConwaysBoard;
