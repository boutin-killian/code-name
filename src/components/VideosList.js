import React, {useState, useEffect} from "react";
import axios from "axios";
import {Grid, Segment} from "semantic-ui-react";
import ArticleCard from "./ArticleCard";

const VideoList = (props) => {

  const [videoFound, setMusicFound] = useState([]);
  const [videos, setMusics] = useState([]);
  const [filteredMusic, setFilteredMusic] = useState([]);

  useEffect(() => {
    setMusicFound(false);
    axios.get("http://localhost:3002/articles/video").then(res => {
      const videos = res.data;
      setMusicFound(true);
      setMusics(videos);
      setFilteredMusic(videos);
    });
  }, []);

  function getFilteredMusics(e) {
    setFilteredMusic(videos.filter((video) => {
      let videoTitle = video.title.toLowerCase();
      return videoTitle.indexOf(e.target.value.toLowerCase()) !== -1
    }));
  }

  return (
      <div className={"articles-div"}>
        <h3>Videos</h3>
        {!videoFound ? (
            <div>Chargement des videos...</div>
        ) : (
            <div>
              <div className={"filter-div"}>
                <label htmlFor="filter">Filtre par titre: </label>
                <input type="text" id="filter"
                       onChange={getFilteredMusics}/>
              </div>
              {filteredMusic.length === 0 ? (
                  <div>Aucune vidéo trouvée.</div>
              ) : (
                  <Grid columns={3} doubling stackable>
                    {filteredMusic.articles.map(video => (
                        <Grid.Column key={video.id}>
                          <Segment style={{height: "26em"}}>
                            <ArticleCard data={video} type={video.type} typeLabel={"Video"}/>
                          </Segment>
                        </Grid.Column>
                    ))}
                  </Grid>
              )}
            </div>
        )}
      </div>
  );
};

export default VideoList;