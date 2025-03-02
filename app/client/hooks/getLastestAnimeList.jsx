import { useState, useEffect } from 'react';

export function useLatestAnimeList() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch('/api/anime');
        if (!response.ok) {
          throw new Error('Error fetching episodes');
        }
        const data = await response.json();
        setAnimeList(data);
      } catch (error) {
        setError(error);
        console.error('Error al obtener los episodios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  return { animeList, loading, error };
}
