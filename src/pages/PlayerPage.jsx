import { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import { fetchAllPlayers } from '../service/ApiService';
import SkeletonPlayer from '../components/SkeletonPlayer';
import Header from '../components/Header';
import PlayerList from '../components/PlayerList';

function TeamPage() {
  const [playerData, setPlayerData] = useState({ players: {}});
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({});

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
        <div className='flex-1 overflow-auto p-4'>
            <div className='grid grid-cols-3 gap-4'>
                <SkeletonPlayer />
                <SkeletonPlayer />
                <SkeletonPlayer />
            </div>
        </div>
      ) : (
        <>
          <Header title={`Liste de tous les joueurs`} breadcrumbItems={[{ label: 'Accueil', href: '/' }, { label: 'Joueurs' }]} />
          <FilterBar handleApplyFilter={handleApplyFilter} />
          <PlayerList teamData={playerData} matchStats={[""]} />
        </>
      )}
    </>
  );
}

export default TeamPage;
