import type { NextPage, GetStaticProps } from 'next';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useWindowSize } from '@react-hook/window-size';
import { getInitialLocale } from '@/utils/i18n';
import { wrapper } from '@/stores';
import ConwaysBoard, { ConwaysBoardCommands } from '@/components/ConwaysBoard';
import {
  startConwaysGame,
  StartConwaysGameEvents,
} from '@/hooks/start-conways-game';
import { CleanBoard, Player } from '@/libs/ConwaysGameCanvas/types';

type Props = {
  socketUrl: string;
};

const Home: NextPage<Props> = function Home({ socketUrl }) {
  const conwaysBoardRef = useRef<ConwaysBoardCommands>(null);
  const [windowWidth, windowHeight] = useWindowSize();
  const [conwaysGameLayout, setConwaysGameLayout] = useState<
    'full-height' | 'full-width'
  >('full-height');
  const { t } = useTranslation();

  // Callbacks for startConwaysGame Hook
  const startConwaysGameEvents: StartConwaysGameEvents = {
    onGameStarted: (
      size: number,
      b: CleanBoard,
      p: Player,
      ps: Player[]
    ): any => {
      conwaysBoardRef.current?.startGame(size, b, p, ps);
    },
    onBoardUpdated: (b: CleanBoard): any => {
      conwaysBoardRef.current?.updateBoard(b);
    },
    onPlayerJoined: (p: Player): any => {
      conwaysBoardRef.current?.addPlayer(p);
    },
    onPlayerLeft: (playerId: string): any => {
      conwaysBoardRef.current?.removePlayer(playerId);
    },
    onCellRevived: (x: number, y: number, playerId: string): any => {
      conwaysBoardRef.current?.reviveCell(x, y, playerId);
    },
  };

  const { started, reviveCell } = startConwaysGame(
    socketUrl,
    startConwaysGameEvents
  );

  const onReviveCell = (x: number, y: number) => {
    reviveCell(x, y);
  };

  useEffect(() => {
    if (windowWidth > windowHeight) {
      setConwaysGameLayout('full-height');
    } else {
      setConwaysGameLayout('full-width');
    }
  }, [windowWidth, windowHeight]);

  return (
    <main>
      <div className="relative flex items-center justify-center w-screen h-screen overflow-hidden py-8">
        <div className="absolute top-0 left-0 w-full">
          <h1 className="text-center">{t('conways.game', { ns: 'index' })}</h1>
        </div>
        <div
          className={`
            ${conwaysGameLayout === 'full-height' ? 'h-full' : 'w-full'}
          `}
        >
          {started ? (
            <ConwaysBoard ref={conwaysBoardRef} onReviveCell={onReviveCell} />
          ) : null}
        </div>
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  () =>
    async ({ locale }) => ({
      props: {
        ...(await serverSideTranslations(getInitialLocale(locale), ['index'])),
        socketUrl: process.env.SOCKET_URL,
      },
    })
);

export default Home;
