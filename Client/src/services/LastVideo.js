import { GetLastVideo, fetchName } from "../components/YoutubeApi";
import React,{ useState} from "react";

const LastVideo = props => {
  const [query, setQuery] = useState('');
  const [ChannelTitle, setChannelTitle] = useState('');
  const [VideoID, setVideoID] = useState(null);

    const search = async (e) => {
    if(e.key === 'Enter') {
       const res = await GetLastVideo(query);
       const name = await fetchName(query);
       setChannelTitle(name.data.items[0].snippet.title)
       setQuery('');
       setVideoID(res.data.items[0].id.videoId);
       console.log(VideoID);
    }
  }

  return (
    <div className="LastVideo">
       <div className="main-container">
          <input type="text"className="search"placeholder="Search..."value={query}onChange={(e) => setQuery(e.target.value)}onKeyPress={search}/>
          {ChannelTitle != null && <div className="Chaine">
              {<h2 className="nom de la chaine">
                {ChannelTitle}
              </h2>}
            </div> }
            <div className="video-player">
              {VideoID != null &&  <iframe
                title={VideoID}
                className="video-iframe"
                height= {360}
                width= {640}
                src={`http://www.youtube.com/embed/${VideoID}`}
              /> }
            </div>
        </div>
    </div>
  )
};

export default LastVideo;
