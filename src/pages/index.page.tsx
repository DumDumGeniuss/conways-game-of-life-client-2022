import type {
  NextPage,
  GetStaticProps,
  // GetServerSideProps,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getInitialLocale } from '@/utils/i18n';
import { wrapper } from '@/stores';
import ConwaysBoard from '@/components/ConwaysBoard';

const Home: NextPage = function Home() {
  const { t } = useTranslation();

  return (
    <main>
      <h1 className="text-center m-5">{t('conways.game', { ns: 'index' })}</h1>
      <div className="flex justify-center">
        <div className="w-9/12">
          <ConwaysBoard size={150} />
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
      },
    })
);

export default Home;
