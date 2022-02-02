import React,{useState} from "react";
import { fetchYoutube, fetchName } from "../components/YoutubeApi";

const SubCount = props => {
  const [subscribers,setSubscribers] = useState(null);
  const [views,setViews] = useState(null);
  const [query, setQuery] = useState('');
  const [ChannelTitle, setChannelTitle] = useState('');
  const [Thumbnail, setThumbnail] = useState(null);

  const search = async (e) => {
    if(e.key === 'Enter') {
      const res = await fetchYoutube(query);
      const name = await fetchName(query);
      setSubscribers(res.data.items[0].statistics.subscriberCount)
      setViews(res.data.items[0].statistics.viewCount)
      setChannelTitle(name.data.items[0].snippet.title)
      setThumbnail(name.data.items[0].snippet.thumbnails.default.url)
      setQuery('');
    }
  }
  return (
    <div className="SubCount">
      <div className="main-container">
        <input type="text"className="search"placeholder="Search..."value={query}onChange={(e) => setQuery(e.target.value)}onKeyPress={search}/>
        {ChannelTitle != null && <div className="Chaine">
          {<h2 className="nom de la chaine">
            {ChannelTitle}
          </h2>}
          </div> }
            {subscribers != null && <div className="Nombre d'abonnées">
                {subscribers} personnes abonnées
            </div> }
            {views != null && <div className="Nombre de vues">
                {views} vues sur la chaine
            </div> }
            {Thumbnail != null && <div className="info">
                <img className="chaine-icon" src={Thumbnail} alt={""} />
            </div> }
      </div>
    </div>
  );
};

export default SubCount;
