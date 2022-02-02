import axios from 'axios';
const API_KEY = "AIzaSyDpSPCh8pCU-lud0L_ZkZrBd4jUXXz50Hg"
var channelID = null;

export const fetchYoutube = async (query) => {

    const ret = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                type: 'channel',
                maxResults: '1',
                q: query,
                key: API_KEY,
            },
            method: 'GET'
        })
        channelID = ret.data.items[0].id.channelId;

        // Get sub count
        const ret2 = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
            params: {
                part: 'statistics',
                id: channelID,
                key: API_KEY,
            },
            method: 'GET'
        })
        return ret2;
}

export const GetLastVideo = async (query) => {
    const ret = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                type: 'channel',
                maxResults: '1',
                q: query,
                key: API_KEY,
            },
            method: 'GET'
        })
        channelID = ret.data.items[0].id.channelId;
    // Get last video
    const ret2 = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
            part: 'snippet',
            channelId: channelID,
            maxResults: '1',
            order: 'date',
            type: 'video',
            key: API_KEY,
        },
        method: 'GET'
    })
    return (ret2);
}
export const fetchName = async (query) => {
    const ret2 = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
        params: {
            part: 'snippet',
            id: channelID,
            key: API_KEY,
        },
        method: 'GET'
    })
    return ret2;
}