import { forwardRef, useRef, useState, useImperativeHandle } from 'react';
import { ConwaysGameCanvas, CellClickHandler } from '@/libs/ConwaysGameCanvas';
import { CleanBoard, CleanCell, Player } from '@/libs/ConwaysGameCanvas/types';

type Props = {
  size: number;
  onCellClick: CellClickHandler;
};

export type ConwaysBoardCommands = {
  startGame: (board: CleanBoard, player: Player) => any;
  updateBoard: (board: CleanBoard) => any;
  reviveCell: (x: number, y: number, cell: CleanCell) => any;
};

const ConwaysBoard = forwardRef<ConwaysBoardCommands, Props>(
  ({ size, onCellClick }, ref) => {
    const conwayBoardRef = useRef<HTMLDivElement | null>(null);
    const [conwayBoard, setConwayBoard] = useState<ConwaysGameCanvas | null>(
      null
    );
    useImperativeHandle(ref, () => ({
      startGame(b: CleanBoard, p: Player) {
        if (!conwayBoardRef.current) {
          return;
        }
        const conwayBoardDom = conwayBoardRef.current;
        const newBoard = new ConwaysGameCanvas(
          conwayBoardDom,
          size,
          b,
          p,
          onCellClick
        );
        setConwayBoard(newBoard);
      },
      updateBoard(b: CleanBoard) {
        conwayBoard?.setBoard(b);
      },
      reviveCell(x: number, y: number, cell: CleanCell) {
        conwayBoard?.setCell(x, y, cell);
      },
    }));

    return <div ref={conwayBoardRef} className="w-full" />;
  }
);

export default ConwaysBoard;
