const { Anime } = require("../models/anime")

const baseUrl = "https://kitsu.io/api/edge/"
const headerOption = {
    "Accept": "application/vnd.api+json" ,
    "Content-Type": "application/vnd.api+json"
}
const GetHelper = async (endpoint) => {
    try {
        const resp = await fetch(baseUrl + endpoint, {
            method: "GET",
            headers: headerOption
        })
        const data = await resp.json()
        return data
    } catch (error) {
        console.error(`Error al obtener información del anime: ${error.message}`)
        throw error
    }
}

const listAnimesBySeasonAndYear = async function (season, year) {
    const endpoint = `anime?filter[season]=${encodeURIComponent(season)}&[seasonYear]=${encodeURIComponent(year)}`
    const data = await GetHelper(endpoint)
    return data
}

const findByName = async function(animeName) {
    const endpoint = `anime?filter[text]=${encodeURIComponent(animeName)}`
    const data = await GetHelper(endpoint)
    const anime = new Anime(data)
    return anime
}

const listEpisodesById = async function(id) {
    const endpoint = `anime/${encodeURIComponent(id)}/episodes}`
    const list = await GetHelper(endpoint)
    return list
}

const login = async function authenticate({email, password}) {
    const url = "https://kitsu.io/api/oauth"
}