import type {
  NextPage,
  GetStaticProps,
  // GetServerSideProps,
} from 'next';
import { useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getInitialLocale } from '@/utils/i18n';
import { wrapper } from '@/stores';
import ConwaysBoard, { ConwaysBoardCommands } from '@/components/ConwaysBoard';
import {
  startConwaysGame,
  StartConwaysGameEvents,
} from '@/hooks/start-conways-game';
import { CleanBoard, CleanCell, Player } from '@/libs/ConwaysGameCanvas/types';

type Props = {
  socketUrl: string;
};

const Home: NextPage<Props> = function Home({ socketUrl }) {
  const conwaysBoardRef = useRef<ConwaysBoardCommands>(null);
  const { t } = useTranslation();

  // Callbacks for startConwaysGame Hook
  const startConwaysGameEvents: StartConwaysGameEvents = {
    onGameStarted: (b: CleanBoard, p: Player): any => {
      conwaysBoardRef.current?.startGame(b, p);
    },
    onCellRevived: (x: number, y: number, cell: CleanCell): any => {
      conwaysBoardRef.current?.reviveCell(x, y, cell);
    },
    onBoardUpdated: (b: CleanBoard): any => {
      conwaysBoardRef.current?.updateBoard(b);
    },
  };

  const { started, reviveCell } = startConwaysGame(
    socketUrl,
    startConwaysGameEvents
  );

  const onCellClick = (x: number, y: number, p: Player) => {
    reviveCell(x, y, p);
  };

  return (
    <main>
      <h1 className="text-center m-5">{t('conways.game', { ns: 'index' })}</h1>
      <div className="flex justify-center">
        <div className="w-9/12">
          {started ? (
            <ConwaysBoard
              ref={conwaysBoardRef}
              size={10}
              onCellClick={onCellClick}
            />
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
