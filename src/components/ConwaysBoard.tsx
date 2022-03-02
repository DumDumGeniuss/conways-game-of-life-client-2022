import { FC, useRef } from 'react';

type Props = {
  size: number;
};

const ConwaysBoard: FC<Props> = function ConwaysBoard({ size }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  if (canvasRef.current) {
    const canvasDom = canvasRef.current;
    const context = canvasDom.getContext('2d') as CanvasRenderingContext2D;
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvasDom.width, canvasDom.height);
  }

  return <canvas ref={canvasRef} width={size} height={size} />;
};

export default ConwaysBoard;
