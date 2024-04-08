import { useEffect, useState } from 'react';
import 'flowbite';
import PropTypes from 'prop-types';
import avatarIcon from '../assets/avatar.png';

function PlayerCard({id, age, firstName, lastName, pseudo, image, nationality, role, birth, equipe, matchesPlayed, matchesWon, matchesLost}) {
  const [activeTab, setActiveTab] = useState('about');
  const [hasLiked, setHasLiked] = useState(false);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  useEffect(() => {
    const liked = localStorage.getItem(`${id}-liked`) === 'true';
    setHasLiked(liked);
  }, [id]);

  const toggleLike = () => {
    setHasLiked(!hasLiked);
    localStorage.setItem(`${id}-liked`, `${!hasLiked}`);
  }

  return (
      <div className="relative w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <ul className="flex flex-wrap text-xs md:text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" role="tablist">
          <li className="mr-2">
            <button onClick={() => handleTabChange('about')} type="button" className={`inline-block p-2 md:p-4 rounded-lg ${activeTab === 'about' ? 'text-emerald-600 dark:text-emerald-500' : 'hover:text-gray-600 dark:hover:text-gray-300'} `} role="tab">
              À propos
            </button>
          </li>
          <li className="mr-2">
            <button onClick={() => handleTabChange('autres')} type="button" className={`inline-block p-2 md:p-4 rounded-lg ${activeTab === 'autres' ? 'text-emerald-600 dark:text-emerald-500' : 'hover:text-gray-600 dark:hover:text-gray-300'} `} role="tab">
              Autres
            </button>
          </li>
          { matchesPlayed && <li className="mr-2">
            <button onClick={() => handleTabChange('stats')} type="button" className={`inline-block p-2 md:p-4 rounded-lg ${activeTab === 'stats' ? 'text-emerald-600 dark:text-emerald-500' : 'hover:text-gray-600 dark:hover:text-gray-300'} `} role="tab">
              Stats
            </button>
          </li> }
        </ul>
          <div className="p-2 md:p-4">
              {activeTab === 'about' && (
                <div className="bg-white rounded-lg dark:bg-gray-800">
                    <img 
                        src={image ? image : avatarIcon}
                        alt="Player Image"
                        className="w-24 md:w-32 h-24 md:h-32 mx-auto rounded-full object-cover"
                    />
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
                        { age ? <li><span className="font-bold">Age</span> : {age}</li> : null }
                        { nationality ? <li><span className="font-bold">Nationalité</span> : {nationality}</li> : null }
                        { birth ? <li><span className="font-bold">Date de naissance</span> : {birth}</li> : null }
                        <li><span className="font-bold">Pseudo</span> : {pseudo}</li>
                        { equipe ? <li><span className="font-bold">Équipe</span> : {equipe}</li> : null }
                    </ul>
                </div>
              )}
              {activeTab === 'stats' && matchesPlayed && (
                <div className="bg-white rounded-lg md:p-8 dark:bg-gray-800">
                  <ul className="space-y-2 md:space-y-4 text-gray-500 dark:text-gray-400">
                    <li>Matches joués : {matchesPlayed}</li>
                    <li>Matches gagnés : {matchesWon}</li>
                    <li>Matches perdus : {matchesLost}</li>
                  </ul>
                </div>
              )}
          </div>
          <div className="absolute bottom-3 right-3">
            <button className={`btn ${hasLiked ? 'btn-success' : 'btn-outline-primary'}`} onClick={toggleLike}>
              {hasLiked ? (
                <svg className="w-6 h-6 text-emerald-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
                </svg>              
              ) : (
                <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                </svg>
              )}
            </button>
          </div>
      </div>
  );
}

PlayerCard.propTypes = {
  id: PropTypes.string.isRequired,
  age: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  pseudo: PropTypes.string.isRequired,
  image: PropTypes.string,
  nationality: PropTypes.string,
  role: PropTypes.string,
  birth: PropTypes.string,
  equipe: PropTypes.string,
  matchesPlayed: PropTypes.number,
  matchesWon: PropTypes.number,
  matchesLost: PropTypes.number,
};

export default PlayerCard;
