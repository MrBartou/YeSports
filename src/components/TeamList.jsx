import PropTypes from 'prop-types';
import TeamCard from './TeamCard';

function TeamList({ teamData }) {
  if (!teamData) {
    return <div className="text-center font-semibold text-lg p-4">No teams found</div>;
  }

  return (
    <>
      <h1 className="mt-8 mb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">Liste des équipes</h1>
      <div className="grid grid-cols-3 gap-4">
        {teamData.map((teamData, index) => {
          return (
            <TeamCard
              key={index}
              name={teamData.name}
              image_url={teamData.image_url}
              acronym={teamData.acronym}
              location={teamData.location}
              current_videogame={teamData.current_videogame}
              slug={teamData.slug}
            />
          );
        })}
      </div>
    </>
  );
}

TeamList.propTypes = {
  teamData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TeamList;
