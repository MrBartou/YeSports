import { useState, useEffect } from 'react';
import { fetchGameTeams } from '../service/ApiService';
import SkeletonPlayer from '../components/SkeletonPlayer';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import TeamList from '../components/TeamList';

function GamePage() {
  const { gameName } = useParams();
  const [teamData, setTeamData] = useState({ teams: {}});
  const [isLoading, setIsLoading] = useState(true);

  const getGameFullName = (name) => {
    const gameNames = {
      rl: 'Rocket League',
      csgo: 'Counter Strike',
      lol: 'League of Legends',
    };
    return gameNames[name] || name;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
          setIsLoading(true);
          const data = await fetchGameTeams(gameName);
          if (!data) return;

          setTeamData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [gameName]);

  return isLoading ? (
        <>
            <Header title={`Liste de toutes les équipes de ${getGameFullName(gameName)}`} breadcrumbItems={[{ label: 'Accueil', href: '/' }, { label: 'Équipes' }, { label: getGameFullName(gameName)}]} />
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
          <Header title={`Liste de toutes les équipes de ${getGameFullName(gameName)}`} breadcrumbItems={[{ label: 'Accueil', href: '/' }, { label: 'Équipes' }, { label: getGameFullName(gameName)}]} />
          <TeamList teamData={teamData} />
        </>
  );
}

export default GamePage;
