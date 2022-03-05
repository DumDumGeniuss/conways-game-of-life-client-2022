import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Player, CleanBoard, CleanCell } from '@/libs/ConwaysGameCanvas/types';

type User = {
  id: string;
  color: string;
};

export type StartConwaysGameEvents = {
  onGameStarted: (size: number, b: CleanBoard, p: Player) => any;
  onReviveCellFailed: (x: number, y: number, c: CleanCell) => any;
  onBoardUpdated: (b: CleanBoard) => any;
};

export function startConwaysGame(
  socketUrl: string,
  events: StartConwaysGameEvents
) {
  const [started, setStarted] = useState<boolean>(false);
  const [conwaySocket, setConwaySocket] = useState<ReturnType<typeof io>>();

  const reviveCell = (x: number, y: number) => {
    if (!conwaySocket) {
      return;
    }
    conwaySocket.emit('revive_cell', x, y);
  };
  useEffect(() => {
    const newSocket = io(`${socketUrl}/conways-game`, {
      auth: {
        authorization: sessionStorage.getItem('auth_token'),
      },
    });
    setConwaySocket(newSocket);

    newSocket.on('logged', (u: User, token: string) => {
      sessionStorage.setItem('auth_token', token);
    });

    newSocket.on(
      'game_started',
      (size: number, p: Player, ps: Player[], b: CleanBoard) => {
        console.log('started');
        setStarted(true);
        events.onGameStarted(size, b, p);
      }
    );

    newSocket.on(
      'revive_cell_failed',
      (x: number, y: number, cell: CleanCell) => {
        events.onReviveCellFailed(x, y, cell);
      }
    );

    newSocket.on('board_updated', (b: CleanBoard) => {
      events.onBoardUpdated(b);
    });

    newSocket.on('connect_error', () => {});
  }, []);

  return { started, reviveCell };
}

export default {};
