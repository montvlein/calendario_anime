import fetchLastestEpisodes from '@server/animeflv/getLatest';
import getLastEpisodeReleaseDate from '@server/kitsu.io/getLastEpisodeReleaseDate';

async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const episodes = await fetchLastestEpisodes();

            const episodesWithDates = await Promise.all(episodes.map(async (episode) => {
                const releaseDate = await getLastEpisodeReleaseDate(episode.title, episode.chapter);
                return {
                    id: episode.id,
                    title: episode.title,
                    chapter: episode.chapter,
                    cover: episode.cover,
                    url: episode.url,
                    releaseDate,
                };
            }));

            res.status(200).json(episodesWithDates);
        } catch (error) {
            console.error('Error in API route:', error);
            res.status(500).json({ error: 'Error fetching data' });
        }
    }
}

export default handler;