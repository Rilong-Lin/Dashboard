import React, { Component } from 'react';
import Profile from './profile.js';
import Gallery from './gallery.js';
import RelatedArtists from './RelatedArtists';

class SpotifyApi extends Component{
  constructor(props){
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: [],
      token: '',
      related_artists: null
    }
  }

  componentDidMount() {
    if (localStorage.getItem("accessToken")) {
      this.setState({token: localStorage.getItem("accessToken")});
    }
  }
  getArtist(){
    if(this.state.artist !== null){
      const BASE_URL = 'https://api.spotify.com/v1/artists/';
      let FETCH_URL = `${BASE_URL}${this.state.artist.id}/related-artists`
      fetch(FETCH_URL, {
        headers: {
          Authorization: "Bearer " + this.state.token,
        },
        method: 'GET'
      })
      .then(response=> response.json())
      .then(json=>{
        this.setState({related_artists: json.artists})
      })
    }
  }
  
  search = async (e) => {
    if(e.key === 'Enter') {
      this.getArtist();
      this.searchAPI();
    }
  }
  searchAPI(query){
    const BASE_URL = "https://api.spotify.com/v1/search?";
    let FETCH_URL = `${BASE_URL}q=${!query ? this.state.query: query}&type=artist&limit=1`;
    const ALBUM_URL = `https://api.spotify.com/v1/artists/`;
    fetch(FETCH_URL, {
      headers: {
        Authorization: "Bearer " + this.state.token,
      },
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({artist})
      console.log(this.state.artist);
      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
      fetch(FETCH_URL, {
        headers: {
          Authorization: "Bearer " + this.state.token,
        },
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => {
        const {tracks} = json;
        this.setState({tracks});
      })
    })
  }

  render(){
    return (
      <div style={{width: '600px'}}className="app">
        <div style={{marginRight: '100px'}} className="app-title">Music Search </div>
            <div>
              <input type="text"className="search"placeholder="Search..."value={this.state.query} onChange={event => {this.setState({query: event.target.value})}} onKeyPress={this.search}/>
              </div>
        { this.state.artist !== null && this.state.related_artists !== null ? <div>
                                      <Profile
                                        artist={this.state.artist}
                                      />
                                      <Gallery
                                        tracks={this.state.tracks}
                                      />
                                      <RelatedArtists
                                        relatedartists={this.state.related_artists}
                                        search={this.search.bind(this)}
                                        getArtist={this.getArtist.bind(this)}
                                      />
                                  </div>
                                  : <div style={{marginRight: '100px'}}> Search for an artist! </div>
        }
        </div>
    )
  }
}

export default SpotifyApi;