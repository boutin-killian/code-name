import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Segment } from "semantic-ui-react";
import ArticleCard from "./ArticleCard";

export default function ArticleList() {
  const [books, setMusics] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/articles?type=book").then(res => {
      const books = res.data;
      setMusics(books);
    });
  }, []);

  return (
    <>
      <h3>Musique</h3>
      {books.length === 0 ? (
        <div>loading...</div>
      ) : (
        <div>
          <Grid columns={3} doubling stackable>
            {books.map(book => (
              <Grid.Column key={book.id}>
                <Segment style={{ height: "26em" }}>
                  <ArticleCard data={book} />
                </Segment>
              </Grid.Column>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
}
