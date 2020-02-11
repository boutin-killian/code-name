import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Segment } from "semantic-ui-react";
import Book from "./BookCard";

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/products").then(res => {
      const books = res.data;
      setBooks(books);
    });
  }, []);
  // grid layout based on https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/ResponsiveLayout.js
  return (
    <>
      <h3>Livres</h3>
      {books.length === 0 ? (
        <div>loading...</div>
      ) : (
        <div>
          <Grid columns={3} doubling stackable>
            {books.map(b => (
              <Grid.Column key={b.id}>
                <Segment style={{ height: "26em" }}>
                  <Book data={b} />
                </Segment>
              </Grid.Column>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
}
