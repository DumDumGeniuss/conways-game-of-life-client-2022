import { forwardRef, useRef, useState, useImperativeHandle } from 'react';
import { ConwaysGameCanvas, ReviveCellHandler } from '@/libs/ConwaysGameCanvas';
import { CleanBoard, CleanCell, Player } from '@/libs/ConwaysGameCanvas/types';

type Props = {
  onReviveCell: ReviveCellHandler;
};

export type ConwaysBoardCommands = {
  startGame: (size: number, board: CleanBoard, player: Player) => any;
  updateBoard: (board: CleanBoard) => any;
  updateCell: (x: number, y: number, cell: CleanCell) => any;
};

const ConwaysBoard = forwardRef<ConwaysBoardCommands, Props>(
  ({ onReviveCell }, ref) => {
    const conwayBoardRef = useRef<HTMLDivElement | null>(null);
    const [conwayBoard, setConwayBoard] = useState<ConwaysGameCanvas | null>(
      null
    );
    useImperativeHandle(ref, () => ({
      startGame(size: number, b: CleanBoard, p: Player) {
        if (!conwayBoardRef.current) {
          return;
        }
        const conwayBoardDom = conwayBoardRef.current;
        const newBoard = new ConwaysGameCanvas(
          conwayBoardDom,
          size,
          b,
          p,
          onReviveCell
        );
        setConwayBoard(newBoard);
      },
      updateBoard(b: CleanBoard) {
        conwayBoard?.setBoard(b);
      },
      updateCell(x: number, y: number, cell: CleanCell) {
        conwayBoard?.setCell(x, y, cell);
      },
    }));

    return <div ref={conwayBoardRef} className="w-full" />;
  }
);

export default ConwaysBoard;
