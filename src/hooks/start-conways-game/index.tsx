import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Player, CleanBoard } from '@/libs/ConwaysGameCanvas/types';

type User = {
  id: string;
  color: string;
};

export type StartConwaysGameEvents = {
  onGameStarted: (size: number, b: CleanBoard, p: Player, ps: Player[]) => any;
  onBoardUpdated: (b: CleanBoard) => any;
  onCellRevived: (x: number, y: number, playerId: string) => any;
  onPlayerJoined: (p: Player) => any;
  onPlayerLeft: (playerId: string) => any;
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
        setStarted(true);
        events.onGameStarted(size, b, p, ps);
      }
    );

    newSocket.on('player_joined', (p: Player) => {
      events.onPlayerJoined(p);
    });

    newSocket.on('player_left', (playerId: string) => {
      events.onPlayerLeft(playerId);
    });

    newSocket.on('cell_revived', (x: number, y: number, playerId: string) => {
      events.onCellRevived(x, y, playerId);
    });

    newSocket.on('board_updated', (b: CleanBoard) => {
      events.onBoardUpdated(b);
    });

    newSocket.on('connect_error', () => {});
  }, []);

  return { started, reviveCell };
}

export default {};
