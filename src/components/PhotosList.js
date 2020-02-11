import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Segment } from "semantic-ui-react";
import ArticleCard from "./ArticleCard";

export default function ArticleList() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/articles?type=photo").then(res => {
      const photos = res.data;
      setPhotos(photos);
    });
  }, []);

  return (
    <>
      <h3>Photos</h3>
      {photos.length === 0 ? (
        <div>loading...</div>
      ) : (
        <div>
          <Grid columns={3} doubling stackable>
            {photos.map(photo => (
              <Grid.Column key={photo.id}>
                <Segment style={{ height: "26em" }}>
                  <ArticleCard data={photo} />
                </Segment>
              </Grid.Column>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
}
