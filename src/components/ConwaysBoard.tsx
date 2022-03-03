import { FC, useRef, useEffect, useState } from 'react';

type Props = {
  size: number;
};

const ConwaysBoard: FC<Props> = function ConwaysBoard({ size }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasInitCanvas, setHasInitCanvas] = useState(false);

  /**
   * Initialize Canvas
   */
  useEffect(() => {
    if (canvasRef.current && !hasInitCanvas) {
      const canvasDom = canvasRef.current;
      const context = canvasDom.getContext('2d');
      if (context) {
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvasDom.width, canvasDom.height);
        setHasInitCanvas(true);
      }
    }
  });

  return <canvas ref={canvasRef} width={size} height={size} />;
};

export default ConwaysBoard;
