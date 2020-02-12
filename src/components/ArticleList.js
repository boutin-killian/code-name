import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Segment } from "semantic-ui-react";
import ArticleCard from "./ArticleCard";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/articles").then(res => {
      const articles = res.data;
      setArticles(articles);
    });
  }, []);
  // grid layout based on https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/ResponsiveLayout.js
  return (
    <>
      <h3>Articles</h3>
      {articles.length === 0 ? (
        <div>loading...</div>
      ) : (
        <div>
          <Grid columns={3} doubling stackable>
            {articles.map(article => (
              <Grid.Column key={article.id}>
                <Segment style={{ height: "26em" }}>
                  <ArticleCard data={article} />
                </Segment>
              </Grid.Column>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
}
