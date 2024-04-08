const BASE_URL = "https://api.pandascore.co";
const AUTH_HEADER = {
    accept: 'application/json',
    authorization: `Bearer UPvzAF-JHJCJj4ME_DMf7gW2fJ5CEuEa2hKE-LS5dn-kNbTTepU`
};

async function fetchFromApi(endpoint, queryParams = {}) {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    Object.entries(queryParams).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
    });

    const response = await fetch(url, { headers: AUTH_HEADER });
    if (!response.ok) throw new Error(`Failed to fetch data from ${endpoint}: ${response.statusText}`);
    return response.json();
}

export const fetchAllPlayers = async (filters = {}) => {
    const queryParams = {};

    if (filters.nationality) queryParams['filter[nationality]'] = filters.nationality;
    if (filters.role) queryParams['filter[role]'] = filters.role;
    if (filters.videogame_id) queryParams['filter[videogame_id]'] = filters.videogame_id;
    if (filters.search) queryParams['search[name]'] = filters.search;
    if (filters.per_page) queryParams['page[size]'] = filters.per_page;
    if (filters.page) queryParams['page'] = filters.page;

    return fetchFromApi('players', queryParams);
};

export const fetchTeamData = teamSlug => fetchFromApi(`teams/${teamSlug}`);
export const fetchPlayerMatches = playerId => fetchFromApi(`players/${playerId}/matches`);
export const fetchGameTeams = gameName => fetchFromApi(`${gameName}/teams`);
