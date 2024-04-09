import { useState, useEffect } from 'react';
import CustomCalendar from '../components/CustomCalendar';
import MatchComponent from '../components/MatchComponent';
import { fetchGameMatchesByMonth } from '../service/ApiService';
import { format, addMonths, subMonths } from 'date-fns';

function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [matches, setMatches] = useState({});
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMatch, setSelectedMatch] = useState(null);

    useEffect(() => {
        const GAME_IDS = [1, 2, 22];
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        let allMatches = {};

        Promise.all(GAME_IDS.map(gameId => fetchGameMatchesByMonth(gameId, year, month)))
            .then(allFetchedMatchesArrays => {
                allFetchedMatchesArrays.forEach(fetchedMatches => {
                    fetchedMatches.forEach(match => {
                        const matchDay = match.begin_at.split('T')[0];
                        if (!allMatches[matchDay]) {
                            allMatches[matchDay] = [];
                        }
                        allMatches[matchDay].push(match);
                    });
                });
                setMatches(allMatches);
            })
            .catch(error => console.error('Fetching matches error:', error));
    }, [currentDate]);

    const handleDayClick = (dayStr) => {
        setSelectedDay(dayStr);
        setSelectedMatch(null);
    };

    const handleMatchClick = (match) => {
        setSelectedMatch(match);
    };

    const handlePrevMonth = () => {
        setCurrentDate(prev => subMonths(prev, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => addMonths(prev, 1));
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-between py-4">
                <button onClick={handlePrevMonth} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Prev</button>
                <h2 className="text-xl text-gray-900 dark:text-white">{format(currentDate, 'MMMM yyyy')}</h2>
                <button onClick={handleNextMonth} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next</button>
            </div>
            <CustomCalendar currentDate={currentDate} onSelectDay={handleDayClick} matches={matches} />
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedDay && matches[selectedDay]?.map(match => (
                    <div key={match.id} className="col-span-1">
                        <MatchComponent match={match} onSelect={handleMatchClick} />
                    </div>
                ))}
            </div>
            {selectedMatch && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <h3 className="text-lg font-semibold">{selectedMatch.name}</h3>
                        <p>Date: {selectedMatch.begin_at}</p>
                        <button onClick={() => setSelectedMatch(null)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CalendarPage;
