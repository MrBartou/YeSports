import { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import { fetchAllPlayers } from '../service/ApiService';
import SkeletonPlayer from '../components/SkeletonPlayer';
import Header from '../components/Header';
import PlayerList from '../components/PlayerList';
import { useTranslation } from 'react-i18next';

function TeamPage() {
  const [playerData, setPlayerData] = useState({ players: {}});
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({});

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllPlayers(filters);
        if (!data) return;

        setPlayerData({
          players: data
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleApplyFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      {isLoading ? (
        <>
            <Header title={t("playerPage__title")} breadcrumbItems={[{ label: t("home"), href: '/' }, { label: t("players") }]} />
            <div className='flex-1 overflow-auto p-4'>
                <div className='grid grid-cols-3 gap-4'>
                    <SkeletonPlayer />
                    <SkeletonPlayer />
                    <SkeletonPlayer />
                </div>
            </div>
        </>
      ) : (
        <>
          <Header title={t("playerPage__title")} breadcrumbItems={[{ label: t("home"), href: '/' }, { label: t("players") }]} />
          <FilterBar handleApplyFilter={handleApplyFilter} />
          <PlayerList teamData={playerData} matchStats={[""]} />
        </>
      )}
    </>
  );
}

export default TeamPage;
