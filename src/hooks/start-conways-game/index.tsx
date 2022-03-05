import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Player, CleanBoard } from '@/libs/ConwaysGameCanvas/types';

type User = {
  id: string;
  color: string;
};

enum SocketEventName {
  Logged = 'logged',
  GameStarted = 'game_started',
  PlayerJoined = 'player_joined',
  PlayerLeft = 'player_left',
  CellRevived = 'cell_revived',
  BoardUpdated = 'board_updated',
  ReviveCell = 'revive_cell',
  ConnectError = 'connect_error',
}

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
    conwaySocket.emit(SocketEventName.ReviveCell, x, y);
  };
  useEffect(() => {
    const newSocket = io(`${socketUrl}/conways-game`, {
      auth: {
        authorization: sessionStorage.getItem('auth_token'),
      },
    });
    setConwaySocket(newSocket);

    newSocket.on(SocketEventName.Logged, (u: User, token: string) => {
      sessionStorage.setItem('auth_token', token);
    });

    newSocket.on(
      SocketEventName.GameStarted,
      (size: number, p: Player, ps: Player[], b: CleanBoard) => {
        setStarted(true);
        events.onGameStarted(size, b, p, ps);
      }
    );

    newSocket.on(SocketEventName.PlayerJoined, (p: Player) => {
      events.onPlayerJoined(p);
    });

    newSocket.on(SocketEventName.PlayerLeft, (playerId: string) => {
      events.onPlayerLeft(playerId);
    });

    newSocket.on(
      SocketEventName.CellRevived,
      (x: number, y: number, playerId: string) => {
        events.onCellRevived(x, y, playerId);
      }
    );

    newSocket.on(SocketEventName.BoardUpdated, (b: CleanBoard) => {
      events.onBoardUpdated(b);
    });

    newSocket.on(SocketEventName.ConnectError, () => {});
  }, []);

  return { started, reviveCell };
}

export default {};
