const BASE_URL = "https://api.pandascore.co";
const AUTH_HEADER = {
    accept: 'application/json',
    authorization: `Bearer AoQmVNGTseJUalgPE4kipVvn_5yPUJ7eZxdrI9K5K3jee2cZ3Bg`
};

async function fetchFromApi(endpoint) {
    const response = await fetch(`${BASE_URL}/${endpoint}`, { headers: AUTH_HEADER });
    if (!response.ok) throw new Error(`Failed to fetch data from ${endpoint}`);
    return response.json();
}

export const fetchTeamData = teamSlug => fetchFromApi(`teams/${teamSlug}`);
export const fetchPlayerMatches = playerId => fetchFromApi(`players/${playerId}/matches`);