import 'flowbite';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import teamIcon from '../assets/team.png';

function TeamCard({ name, image_url, acronym, location, current_videogame, slug }) {

  return (
    <div className="p-2">
      <Link to={`/teams/${slug}`} className="block">
        <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden h-full flex flex-col dark:bg-gray-800 dark:border-gray-700 text-center">
          <img
            src={image_url ? image_url : teamIcon}
            alt={name}
            className="w-48 h-48 max-h-48 object-contain mx-auto"
          />
          <div className="p-4 flex-grow">
            <h3 className="font-bold text-xl mb-2 tracking-tight text-gray-900 dark:text-white">{name}</h3>
            <p className="text-gray-700 dark:text-gray-400 text-base">
              Acronym: {acronym}<br />
              Location: {location}<br />
              Game: {current_videogame.name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

TeamCard.propTypes = {
  name: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  acronym: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  current_videogame: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
};

export default TeamCard;
