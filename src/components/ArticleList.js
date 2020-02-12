import React, {useState, useEffect} from "react";
import axios from "axios";
import {Grid, Segment} from "semantic-ui-react";
import ArticleCard from "./ArticleCard";

export default function ArticlesList() {
    const [articleFound, setArticleFound] = useState([]);
    const [articles, setArticles] = useState([]);
    const [filteredArticle, setFilteredArticle] = useState([]);

    useEffect(() => {
        setArticleFound(false);
        axios.get("http://localhost:3001/articles").then(res => {
            const articles = res.data;
            setArticleFound(true);
            setArticles(articles);
            setFilteredArticle(articles);
        });
    }, []);

    function getFilteredArticles(e) {
        setFilteredArticle(articles.filter((article) => {
            let articleTitle = article.title.toLowerCase();
            return articleTitle.indexOf(e.target.value.toLowerCase()) !== -1
        }));
    }

    return (
        <div className={"articles-div"}>
            <h3>Articles</h3>
            {!articleFound ? (
                <div>Chargement des articles...</div>
            ) : (
                <div>
                    <div className={"filter-div"}>
                        <label htmlFor="filter">Filtre par titre: </label>
                        <input type="text" id="filter"
                               onChange={getFilteredArticles}/>
                    </div>
                    {filteredArticle.length === 0 ? (
                        <div>Aucune article trouvé.</div>
                    ) : (
                        <Grid columns={3} doubling stackable>
                            {filteredArticle.map(article => (
                                <Grid.Column key={article.id}>
                                    <Segment style={{height: "26em"}}>
                                        <ArticleCard data={article} type={article.type} typeLabel={"Musique"}/>
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
