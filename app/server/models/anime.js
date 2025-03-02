export class Anime {
    constructor(animeData) {
        id = animeData.id,
        type = animeData.type,
        title = animeData.attributes.canonicalTitle,
        synopsis = animeData.attributes.synopsis,
        episodeCount = animeData.attributes.episodeCount,
        startDate = animeData.attributes.startDate,
        endDate = animeData.attributes.endDate,
        status = animeData.attributes.status,
        rating = animeData.attributes.averageRating,
        posterImage = animeData.attributes.posterImage.original,
        coverImage = animeData.attributes.coverImage.original
    }
}