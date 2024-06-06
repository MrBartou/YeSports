import fetch from 'node-fetch';

export default async (req, res) => {
  const endpoint = req.query.endpoint;
  const url = `https://api.pandascore.co/${endpoint}`;

  const apiRes = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer UPvzAF-JHJCJj4ME_DMf7gW2fJ5CEuEa2hKE-LS5dn-kNbTTepU'
    }
  });

  if (!apiRes.ok) {
    return res.status(apiRes.status).json({ message: 'Erreur lors de la connexion à l\'API PandaScore' });
  }
  const data = await apiRes.json();

  res.status(200).json(data);
};
