import PropTypes from 'prop-types';
import GameCard from './GameCard';
import { useTranslation } from 'react-i18next';

function GameList({ games }) {
    const { t } = useTranslation();

    return (
        <>
            <h2 className="mt-8 mb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">{t("gameList__gamesList")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {games.map(game => (
                    <GameCard key={game.name} name={game.name} description={game.description} image={game.image} href={game.href} />
                ))}
            </div>
        </>
    );
}

GameList.propTypes = {
    games: PropTypes.array.isRequired,
};

export default GameList;