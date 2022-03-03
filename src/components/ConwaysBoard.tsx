import { FC, useRef, useEffect, useState } from 'react';
import { Conways } from '@/libs/Conways';

type Props = {
  size: number;
};

const ConwaysBoard: FC<Props> = function ConwaysBoard({ size }) {
  const conwayBoardRef = useRef<HTMLDivElement | null>(null);
  const [hasInitCanvas, setHasInitCanvas] = useState(false);
  const [conwayBoard, setConwayBoard] = useState<Conways | null>(null);

  /**
   * Initialize Canvas
   */
  useEffect(() => {
    if (conwayBoardRef.current && !hasInitCanvas) {
      const conwayBoardDom = conwayBoardRef.current;
      const newBoard = new Conways(conwayBoardDom, size);
      setConwayBoard(newBoard);
      setHasInitCanvas(true);
    }
  });

  useEffect(() => {
    if (!conwayBoard) {
      return undefined;
    }
    const randomPutCell = setInterval(() => {
      const x = Math.round(Math.random() * size);
      const y = Math.round(Math.random() * size);
      conwayBoard.putCell(x, y);
    }, 50);

    return function cleanup() {
      clearInterval(randomPutCell);
    };
  });

  return <div ref={conwayBoardRef} className="w-full" />;
};

export default ConwaysBoard;
