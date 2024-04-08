import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SkeletonPlayer from '../components/SkeletonPlayer';
import { fetchTeamData, fetchPlayerMatches } from '../service/ApiService'
import Header from '../components/Header';
import PlayerList from '../components/PlayerList';

function TeamPage() {
  const { teamSlug } = useParams();
  const [teamData, setTeamData] = useState(null);
  const [matchStats, setMatchStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              setIsLoading(true);
              const team = await fetchTeamData(teamSlug);
              if (!team?.players) return;

              setTeamData(team);
              setTitle(`Equipe ${team.current_videogame.name} de ${team.name}`);
              setBreadcrumbItems([
                { label: 'Accueil', href: '/' },
                { label: team.current_videogame.name, href: '/' },
                { label: team.name }
              ]);

              const matchesResults = await Promise.all(team.players.map(player => fetchPlayerMatches(player.id)));
              const newMatchStats = matchesResults.map((matches, index) => ({
                  id: team.players[index].id,
                  matchesPlayed: matches.length,
                  matchesWon: matches.filter(match => match.winner?.id === team.id).length,
                  matchesLost: matches.filter(match => match.winner && match.winner.id !== team.id).length,
              }));
              setMatchStats(newMatchStats);
          } catch (error) {
              console.error("Erreur lors de la récupération des données:", error);
          } finally {
              setIsLoading(false);
          }
      }

      fetchData();
  }, [teamSlug]);

  return isLoading ? (
        <>
            <Header title={title} breadcrumbItems={breadcrumbItems} />
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
          <Header title={title} breadcrumbItems={breadcrumbItems} />
          <PlayerList teamData={teamData} matchStats={matchStats} />
      </>
  );
}

export default TeamPage;
