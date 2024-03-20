const BASE_URL = "https://api.pandascore.co";
const AUTH_HEADER = {
  accept: 'application/json',
  authorization: `Bearer AoQmVNGTseJUalgPE4kipVvn_5yPUJ7eZxdrI9K5K3jee2cZ3Bg`
};

export const fetchTeamData = async (teamSlug) => {
  const response = await fetch(`${BASE_URL}/teams/${teamSlug}`, { method: 'GET', headers: AUTH_HEADER });
  if (!response.ok) throw new Error('Failed to fetch team data');
  return response.json();
};

export const fetchPlayerMatches = async (playerId) => {
  const response = await fetch(`${BASE_URL}/players/${playerId}/matches`, { method: 'GET', headers: AUTH_HEADER });
  if (!response.ok) throw new Error(`Failed to fetch matches for player ${playerId}`);
  return response.json();
};