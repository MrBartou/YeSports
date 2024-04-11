async function fetchFromApi(endpoint, queryParams = {}) {
    const url = new URL(`/api/pandascore-proxy?endpoint=${endpoint}`, window.location.origin);
    Object.entries(queryParams).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`Failed to fetch data from ${endpoint}: ${response.statusText}`);
    return response.json();
}

async function fetchFromApiWithPagination(endpoint, queryParams = {}) {
    const url = new URL(`/api/pandascore-proxy?endpoint=${endpoint}`, window.location.origin);
    Object.entries(queryParams).forEach(([key, value]) => url.searchParams.append(key, value));

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`Failed to fetch data from ${endpoint}: ${response.statusText}`);

    const data = await response.json();
    const pagination = {
        totalItems: response.headers.get('X-Total'),
        currentPage: response.headers.get('X-Page'),
        perPage: response.headers.get('X-Per-Page'),
    };

    return { data, pagination };
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
export const fetchGameTeams = async (gameName, pageNumber = 1, pageSize = 30) => {
    const queryParams = {};

    if (pageSize) queryParams['page[size]'] = pageSize;
    if (pageNumber) queryParams['page[number]'] = pageNumber;

    return fetchFromApiWithPagination(`${gameName}/teams`, queryParams);
};

export const fetchGameMatchesByMonth = async (gameId, year, month) => {
    const startDate = new Date(Date.UTC(year, month - 1, 1)).toISOString();
    const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59)).toISOString();

    const endpoint = `matches?filter[videogame]=${gameId}&range[begin_at]=${startDate},${endDate}`;
    return fetchFromApi(endpoint);
};
