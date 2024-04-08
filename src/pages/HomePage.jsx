import GameList from '../components/GameList';
import Header from '../components/Header';

import rocketLeagueImage from '../assets/games/rocket-league.jpg';
import csImage from '../assets/games/cs.jpg';
import lolImage from '../assets/games/lol.jpg';

function HomePage() {
    const title = 'Accueil';
    const breadcrumbItems = [
        { label: 'Accueil', href: '/' },
    ];

    const games = [
        { name: 'Rocket League', description: "C'est comme du foot, mais avec des voitures et du boost. Et c'est encore plus fun.", image: rocketLeagueImage, href: '/games/rl' },
        { name: 'Counter-Strike', description: "C'est comme la guerre, mais avec des pistolets à clous et des bombes à C4.", image: csImage, href: '/games/csgo' },
        { name: 'League of Legends', description: "Quand tu perds un match de League of Legends, c'est toujours la faute de ton jungler.", image: lolImage, href: '/games/lol' },
    ]

    return (
        <>
            <Header title={title} breadcrumbItems={breadcrumbItems} />
            <GameList games={games} />
        </>
    );
}

export default HomePage;