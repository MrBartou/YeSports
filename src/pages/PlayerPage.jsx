import { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import { fetchAllPlayers } from '../service/ApiService';
import SkeletonPlayer from '../components/SkeletonPlayer';
import Header from '../components/Header';
import PlayerList from '../components/PlayerList';
import Pagination from '../components/Pagination';
import { useTranslation } from 'react-i18next';

function PlayerPage() {
  const [playerData, setPlayerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(30);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const updatedFilters = { ...filters, 'page[number]': currentPage, 'page[size]': perPage };
        const { data, pagination } = await fetchAllPlayers(updatedFilters);
        if (!data) return;

        setPlayerData(data);
        setTotalPages(Math.ceil(pagination.totalItems / pagination.perPage));
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters, currentPage, perPage]);

  const handleApplyFilter = (newFilters) => {
    setPerPage(newFilters.per_page);
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Header title={t("playerPage__title")} breadcrumbItems={[{ label: t("home"), href: '/' }, { label: t("players") }]} />
      <FilterBar handleApplyFilter={handleApplyFilter} />
      {isLoading ? (
        <div className='flex-1 overflow-auto p-4'>
          <div className='grid grid-cols-3 gap-4'>
            <SkeletonPlayer />
            <SkeletonPlayer />
            <SkeletonPlayer />
          </div>
        </div>
      ) : (
        // console.log(playerData),
        <>
          <PlayerList players={playerData} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}

export default PlayerPage;
