import { useState, useEffect } from 'react';
import { fetchGameTeams } from '../service/ApiService';
import SkeletonPlayer from '../components/SkeletonPlayer';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import TeamList from '../components/TeamList';
import Pagination from '../components/Pagination';
import { useTranslation } from 'react-i18next';

function GamePage() {
  const { gameName } = useParams();
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(30);

  const { t } = useTranslation();

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
        const { data, pagination } = await fetchGameTeams(gameName, currentPage, perPage);
        if (data) {
          setTeamData(data);
          setTotalPages(Math.ceil(pagination.totalItems / pagination.perPage));
          setTotalItems(parseInt(pagination.totalItems, 10));
          setPerPage(parseInt(pagination.perPage, 10));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [gameName, currentPage, perPage]);

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  return (
    <>
      {isLoading ? (
        <>
          <Header title={t("gamePage__title", { game: getGameFullName(gameName)})} breadcrumbItems={[{ label: t("home"), href: '/' }, { label: getGameFullName(gameName) }]} />
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
          <Header title={t("gamePage__title", { game: getGameFullName(gameName)})} breadcrumbItems={[{ label: t("home"), href: '/' }, { label: getGameFullName(gameName) }]} />
          <TeamList teamData={teamData} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            perPage={perPage}
            totalItems={totalItems}/>
        </>
      )}
    </>
  );
}

export default GamePage;
