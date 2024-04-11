import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function MatchComponent({ match }) {
  const { t } = useTranslation();
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200 ease-in-out">
      {match.league.image_url && (
        <img className="rounded-t-lg w-full h-40 object-cover" src={match.league.image_url} alt={match.league.name} />
      )}
      <div className="p-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {match.videogame.name} - {match.name}
        </h5>
        <div className="text-gray-700 dark:text-gray-400 text-sm mt-2">
          <p>{t("status")}: - {match.status}</p>
          <p>{t("number_of_match")}: {match.number_of_games}</p>
          <p>{t("winner")}: {match.winner ? match.winner.name : 'N/A'}</p>
        </div>
        <div className="flex items-center mt-4">
          {match.streams_list.map((stream, index) => (
            <a key={index} href={stream.raw_url} target="_blank" rel="noopener noreferrer" className="mr-2">
              <img src={`https://logo.clearbit.com/${new URL(stream.raw_url).hostname}?size=80`} alt="Streaming platform logo" className="h-8 w-8" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

MatchComponent.propTypes = {
  match: PropTypes.shape({
    name: PropTypes.string.isRequired,
    begin_at: PropTypes.string.isRequired,
    videogame: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    league: PropTypes.shape({
      image_url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    status: PropTypes.string.isRequired,
    number_of_games: PropTypes.number.isRequired,
    winner: PropTypes.shape({
      name: PropTypes.string,
    }),
    streams_list: PropTypes.arrayOf(PropTypes.shape({
      raw_url: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

export default MatchComponent;
