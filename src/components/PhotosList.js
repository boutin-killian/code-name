import React, {useState, useEffect} from "react";
import axios from "axios";
import {Grid, Segment} from "semantic-ui-react";
import ArticleCard from "./ArticleCard";

export default function PhotosList() {
  const [photoFound, setPhotoFound] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [filteredPhoto, setFilteredPhoto] = useState([]);

  useEffect(() => {
    setPhotoFound(false);
    axios.get("http://localhost:3001/articles?type=photo").then(res => {
      const photos = res.data;
      setPhotoFound(true);
      setPhotos(photos);
      setFilteredPhoto(photos);
    });
  }, []);

  function getFilteredPhotos(e) {
    setFilteredPhoto(photos.filter((photo) => {
      let photoTitle = photo.title.toLowerCase();
      return photoTitle.indexOf(e.target.value.toLowerCase()) !== -1
    }));
  }

  return (
      <div className={"articles-div"}>
        <h3>Photos</h3>
        {!photoFound ? (
            <div>Chargement des photos...</div>
        ) : (
            <div>
              <div className={"filter-div"}>
                <label htmlFor="filter">Filtre par titre: </label>
                <input type="text" id="filter"
                       onChange={getFilteredPhotos}/>
              </div>
              {filteredPhoto.length === 0 ? (
                  <div>Aucune photo trouvée.</div>
              ) : (
                  <Grid columns={3} doubling stackable>
                    {filteredPhoto.map(photo => (
                        <Grid.Column key={photo.id}>
                          <Segment style={{height: "26em"}}>
                            <ArticleCard data={photo} type={photo.type} typeLabel={"Photo"}/>
                          </Segment>
                        </Grid.Column>
                    ))}
                  </Grid>
              )}
            </div>
        )}
      </div>
  );
}
