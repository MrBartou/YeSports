import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TeamPlayer from '../components/TeamPlayer';
import Sidebar from '../components/Sidebar';
import SkeletonPlayer from '../components/SkeletonPlayer';
import { fetchTeamData, fetchPlayerMatches } from '../service/ApiService'

function TeamInfo() {
  let { teamSlug } = useParams();
  const [teamData, setTeamData] = useState(null);
  const [matchStats, setMatchStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamDataAndMatchStats = async () => {
      try {
        setIsLoading(true);
        const team = await fetchTeamData(teamSlug);

        if (team?.players?.length > 0) {
          setTeamData(team);

          const statsPromises = team.players.map(player => fetchPlayerMatches(player.id));
          const matchesResults = await Promise.all(statsPromises);

          const newMatchStats = matchesResults.map((matches, index) => {
            const { id } = team.players[index];
            return {
              id,
              matchesPlayed: matches.length,
              matchesWon: matches.filter(match => match.winner?.id === team.id).length,
              matchesLost: matches.filter(match => match.winner && match.winner.id !== team.id).length
            };
          });

          setMatchStats(newMatchStats);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamDataAndMatchStats();
  }, [teamSlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white py-5">Chargement...</h1>
        <div className="flex">
          <div className="w-1/5">
            <Sidebar />
          </div>
          <div className="flex-1 overflow-auto p-4">
            <div className="grid grid-cols-3 gap-4">
              <SkeletonPlayer />
              <SkeletonPlayer />
              <SkeletonPlayer />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white py-5">Liste des joueurs de {teamData.name}</h1>
      <div className="flex">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-3 gap-4">
            {teamData.players.map((player) => {
              const playerStats = matchStats.find(stat => stat.id === player.id) || {};
              return (
                <TeamPlayer
                  key={player.id}
                  id={player.id.toString()}
                  age={player.age}
                  firstName={player.first_name}
                  lastName={player.last_name}
                  pseudo={player.name}
                  image={player.image_url}
                  nationality={player.nationality}
                  role={player.role}
                  birth={player.birthday}
                  equipe={teamData.name}
                  matchesPlayed={playerStats.matchesPlayed}
                  matchesWon={playerStats.matchesWon}
                  matchesLost={playerStats.matchesLost}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamInfo;
