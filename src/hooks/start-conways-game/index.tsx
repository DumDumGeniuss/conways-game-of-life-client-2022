import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Player, CleanBoard, CleanCell } from '@/libs/ConwaysGameCanvas/types';

export type StartConwaysGameEvents = {
  onGameStarted: (b: CleanBoard, p: Player) => any;
  onCellRevived: (x: number, y: number, cell: CleanCell) => any;
  onBoardUpdated: (b: CleanBoard) => any;
};

export function startConwaysGame(
  socketUrl: string,
  events: StartConwaysGameEvents
) {
  const [started, setStarted] = useState<boolean>(false);
  const [conwaySocket, setConwaySocket] = useState<ReturnType<typeof io>>();

  const reviveCell = (x: number, y: number, p: Player) => {
    if (!conwaySocket) {
      return;
    }
    conwaySocket.emit('revive_cell', x, y, p.id);
  };
  useEffect(() => {
    const newSocket = io(`${socketUrl}/conways-game`, {
      auth: {
        authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA3OTgzNTQ3MDA0MSIsImNvbG9yIjoiIzEyMzQ1NiIsImlhdCI6MTY0NjM4NDg3N30.fCWHQbtXDMssgkuu4J1ZwW-DbyXPbFr9WqYfgz-Aerk`,
      },
    });
    setConwaySocket(newSocket);

    newSocket.on('game_started', (p: Player, b: CleanBoard) => {
      setStarted(true);
      events.onGameStarted(b, p);
    });

    newSocket.on('cell_revived', (x: number, y: number, cell: CleanCell) => {
      events.onCellRevived(x, y, cell);
    });

    newSocket.on('board_updated', (b: CleanBoard) => {
      events.onBoardUpdated(b);
    });

    newSocket.on('connect_error', () => {});
  }, []);

  return { started, reviveCell };
}

export default {};
