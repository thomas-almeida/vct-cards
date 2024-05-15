const api = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')
const express = require('express')


async function bruteCollect() {
    const response = await api.get('https://www.vlr.gg/stats/?event_group_id=all&event_id=2004&series_id=all&region=all&country=all&min_rounds=200&min_rating=1550&agent=all&map_id=all&timespan=60d')
    const $ = cheerio.load(response.data)

    const playerRow = $('tr')
    let players = []

    playerRow.each((_, element) => {

        const playerData = {
            name: '',
            overall: '',
            acs: '',
            kd: '',
            kast: '',
            adr: '',
            agents: ''
        }

        const $element = $(element)
        playerData.name = `${$element.find('.text-of').text().trim().replace(/\n/g, '').replace(/\t/g, '')} ${$element.find('.stats-player-country').text().trim().replace(/\n/g, '').replace(/\t/g, '')}`;
        playerData.overall = $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(0,4)
        playerData.acs = $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(4,9)
        playerData.kd = $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(9,13)
        playerData.kast = $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(13,16)
        playerData.adr = $element.find('.mod-color-sq div:nth-child(1)').text().trim().slice(16,21)
        playerData.agents = `https://www.vlr.gg/${$element.find('.mod-agents div img').attr("src")}`

        players.push(playerData)
    })

    console.log(players)
}

bruteCollect()