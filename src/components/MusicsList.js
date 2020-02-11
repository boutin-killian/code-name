import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Segment } from "semantic-ui-react";
import ArticleCard from "./ArticleCard";

export default function ArticleList() {
  const [musics, setMusics] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/articles?type=music").then(res => {
      const musics = res.data;
      setMusics(musics);
    });
  }, []);

  return (
    <>
      <h3>Musiques</h3>
      {musics.length === 0 ? (
        <div>loading...</div>
      ) : (
        <div>
          <Grid columns={3} doubling stackable>
            {musics.map(music => (
              <Grid.Column key={music.id}>
                <Segment style={{ height: "26em" }}>
                  <ArticleCard data={music} />
                </Segment>
              </Grid.Column>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
}
