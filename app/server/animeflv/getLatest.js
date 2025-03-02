import { getLatest }  from 'animeflv-api';

export default async function fetchLatestEpisodes() {
    try {
        const episodes = await getLatest();
        return episodes;
    } catch (error) {
        console.error('Error obteniendo episodios:', error);
        return [];
    }
}
