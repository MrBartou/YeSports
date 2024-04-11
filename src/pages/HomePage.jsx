import GameList from '../components/GameList';
import Header from '../components/Header';

import rocketLeagueImage from '../assets/games/rocket-league.jpg';
import csImage from '../assets/games/cs.jpg';
import lolImage from '../assets/games/lol.jpg';
import { useTranslation } from 'react-i18next';

function HomePage() {
    const { t } = useTranslation();

    const title = t("home");
    const breadcrumbItems = [
        { label: t("home"), href: '/' },
    ];

    const games = [
        { name: 'Rocket League', description: t("homePage__rlDescription"), image: rocketLeagueImage, href: '/games/rl' },
        { name: 'Counter-Strike', description: t("homePage__csDescription"), image: csImage, href: '/games/csgo' },
        { name: 'League of Legends', description: t("homePage__lolDescription"), image: lolImage, href: '/games/lol' },
    ]

    return (
        <>
            <Header title={title} breadcrumbItems={breadcrumbItems} />
            <GameList games={games} />
        </>
    );
}

export default HomePage;