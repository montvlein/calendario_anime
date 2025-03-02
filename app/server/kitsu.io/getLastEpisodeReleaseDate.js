export default async function getLastEpisodeReleaseDate(animeName, chapter) {
    const url = `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(animeName)}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error fetching data from Kitsu');
        }

        const data = await response.json();

        if (data.data.length === 0) {
            throw new Error(`Anime not found: ${animeName}`);
        }

        const anime = data.data[0];

        const episodesUrl = anime.relationships.episodes.links.self;

        const episodesResponse = await fetch(episodesUrl);

        if (!episodesResponse.ok) {
            throw new Error(`Error fetching episodes: ${episodesUrl} - anime: ${animeName}`);
        }

        const episodesData = await episodesResponse.json();
        const episodeIds = episodesData.data.map(episode => episode.id);

        const episodePromises = episodeIds.map(id =>
            fetch(`https://kitsu.io/api/edge/episodes/${id}`).then(res => res.json())
        );

        const episodesDetails = await Promise.all(episodePromises);

        const lastEpisode = episodesDetails.find(episode => episode.data.attributes.number === chapter)

        if (!lastEpisode) { throw new Error(`Episode not found: ${animeName} - chapter: ${chapter}`) }

        const releaseDate = lastEpisode?.data?.attributes?.airdate || new Date().toISOString().split('T')[0];

        return releaseDate;

    } catch (error) {
        console.error('Error:', error);
        return new Date().toISOString().split('T')[0];
    }
}
