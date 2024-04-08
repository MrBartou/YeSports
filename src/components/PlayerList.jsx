import PropTypes from 'prop-types';
import PlayerCard from './PlayerCard';
import { useTranslation } from 'react-i18next';

function PlayerList({ teamData, matchStats }) {
    const { t } = useTranslation();

    return (
        <>
            <h1 className="mt-8 mb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">{t("playerList__playersList")}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamData.players.map((player) => {
                    const playerStats = matchStats.find(stat => stat.id === player.id) || {};
                    return (
                        <PlayerCard
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
        </>
    )
}

PlayerList.propTypes = {
    teamData: PropTypes.object.isRequired,
    matchStats: PropTypes.array
};

export default PlayerList;