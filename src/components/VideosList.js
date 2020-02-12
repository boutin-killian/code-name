import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Segment } from "semantic-ui-react";
import ArticleCard from "./ArticleCard";

export default function VideosList() {
  const [videos, setVideo] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/articles?type=video").then(res => {
      const videos = res.data;
      setVideo(videos);
    });
  }, []);

  return (
    <>
      <h3>Videos</h3>
      {videos.length === 0 ? (
        <div>loading...</div>
      ) : (
        <div>
          <Grid columns={3} doubling stackable>
            {videos.map(video => (
              <Grid.Column key={video.id}>
                <Segment style={{ height: "26em" }}>
                  <ArticleCard data={video} type={video.type} typeLabel={"Video"} />
                </Segment>
              </Grid.Column>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
}
