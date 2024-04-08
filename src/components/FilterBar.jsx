import { useState } from 'react';
import PropTypes from 'prop-types';

const nationalities = ['FR', 'US', 'JP', 'KR', 'CN', 'RU', 'BR', 'TR', 'VN', 'TW', 'TH', 'ID', 'PH', 'IN', 'DE', 'ES', 'IT', 'UK', 'CA', 'AU', 'NL', 'BE', 'SE', 'NO', 'DK', 'FI', 'PL', 'CZ', 'SK', 'HU', 'RO', 'GR', 'TR', 'RU', 'UA', 'KZ', 'UZ', 'TM', 'KG', 'TJ', 'AZ', 'AM', 'GE', 'BY', 'MD', 'LV', 'LT', 'EE', 'HR', 'SI', 'BA', 'RS', 'MK', 'BG', 'AL', 'XK', 'ME'];
const videogames = [
  { id: 1, name: 'League of Legends' },
  { id: 22, name: 'Rocket League' },
  { id: 3, name: 'CS:GO' },
];

function FilterBar({ handleApplyFilter }) {
  const [nationality, setNationality] = useState('');
  const [videogameId, setVideogameId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [perPage, setPerPage] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleApplyFilter({
      nationality,
      videogame_id: videogameId,
      search: searchQuery,
      per_page: perPage,
    });
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 dark:text-white">Recherche par nom :</label>
          <input
            type="text"
            id="searchQuery"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
            placeholder="Entrez le nom du joueur"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 dark:text-white">Nationalité :</label>
            <select
              id="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
            >
              <option value="">Sélectionner la nationalité</option>
              {nationalities.map((nat) => (
                <option key={nat} value={nat}>{nat}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="videogameId" className="block text-sm font-medium text-gray-700 dark:text-white">Jeu Vidéo :</label>
            <select
              id="videogameId"
              value={videogameId}
              onChange={(e) => setVideogameId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
            >
              <option value="">Sélectionner un jeu</option>
              {videogames.map((game) => (
                <option key={game.id} value={game.id}>{game.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="perPage" className="block text-sm font-medium text-gray-700 dark:text-white">Résultats par page :</label>
            <input
              type="number"
              id="perPage"
              value={perPage}
              onChange={(e) => setPerPage(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
              placeholder="10"
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Appliquer les filtres
        </button>
      </form>
    </div>
  );
}

FilterBar.propTypes = {
  handleApplyFilter: PropTypes.func.isRequired,
};

export default FilterBar;
