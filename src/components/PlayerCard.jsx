import { useState } from 'react';
import 'flowbite';
import PropTypes from 'prop-types';

function PlayerCard({age, firstName, lastName, pseudo, image, nationality, role, birth, equipe, matchesPlayed, matchesWon, matchesLost}) {
  const [activeTab, setActiveTab] = useState('about');

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  return (
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <ul className="flex flex-wrap text-xs md:text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" role="tablist">
          <li className="mr-2">
            <button onClick={() => handleTabChange('about')} type="button" className={`inline-block p-2 md:p-4 rounded-lg ${activeTab === 'about' ? 'text-blue-600 dark:text-blue-500' : 'hover:text-gray-600 dark:hover:text-gray-300'} `} role="tab">
              À propos
            </button>
          </li>
          <li className="mr-2">
            <button onClick={() => handleTabChange('autres')} type="button" className={`inline-block p-2 md:p-4 rounded-lg ${activeTab === 'autres' ? 'text-blue-600 dark:text-blue-500' : 'hover:text-gray-600 dark:hover:text-gray-300'} `} role="tab">
              Autres
            </button>
          </li>
          <li className="mr-2">
            <button onClick={() => handleTabChange('stats')} type="button" className={`inline-block p-2 md:p-4 rounded-lg ${activeTab === 'stats' ? 'text-blue-600 dark:text-blue-500' : 'hover:text-gray-600 dark:hover:text-gray-300'} `} role="tab">
              Stats
            </button>
          </li>
        </ul>
          <div className="p-2 md:p-4">
              {activeTab === 'about' && (
                <div className="bg-white rounded-lg dark:bg-gray-800">
                    <img src={image} alt="Player Image" className="w-24 md:w-32 h-24 md:h-32 mx-auto rounded-full object-cover" />
                    <h2 className="mt-3 text-center text-xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white truncate">{pseudo}</h2>
                    <p className="mt-2 text-center text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">{firstName} {lastName}</p>
                    {role && (
                        <p className="mt-2 text-center text-xs md:text-sm text-gray-400 dark:text-gray-300">{role}</p>
                    )}
                </div>
              )}
              {activeTab === 'autres' && (
                <div className="bg-white rounded-lg md:p-8 dark:bg-gray-800">
                    <ul className="space-y-2 md:space-y-4 text-gray-500 dark:text-gray-400">
                        <li>Age : {age}</li>
                        <li>Nationalité : {nationality}</li>
                        <li>Date de naissance : {birth}</li>
                        <li>Pseudo : {pseudo}</li>
                        <li>Équipe : {equipe}</li>
                    </ul>
                </div>
              )}
              {activeTab === 'stats' && (
                <div className="bg-white rounded-lg md:p-8 dark:bg-gray-800">
                  <ul className="space-y-2 md:space-y-4 text-gray-500 dark:text-gray-400">
                    <li>Matches joués : {matchesPlayed}</li>
                    <li>Matches gagnés : {matchesWon}</li>
                    <li>Matches perdus : {matchesLost}</li>
                  </ul>
                </div>
              )}
          </div>
      </div>
  );
}

PlayerCard.propTypes = {
  id: PropTypes.string.isRequired,
  age: PropTypes.number,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  role: PropTypes.string,
  birth: PropTypes.string,
  equipe: PropTypes.string,
  matchesPlayed: PropTypes.number,
  matchesWon: PropTypes.number,
  matchesLost: PropTypes.number,
};

export default PlayerCard;
