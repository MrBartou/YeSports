import Header from '../components/Header';

function HomePage() {
    const title = 'Accueil';
    const breadcrumbItems = [
        {
            label: 'Accueil',
            href: '/',
        },
    ];

    return (
        <>
            <Header title={title} breadcrumbItems={breadcrumbItems} />
        </>
    );
}

export default HomePage;