import React, {useEffect, useState} from 'react';
import {Grid, Segment, Button, Icon} from "semantic-ui-react";
import axios from "axios";

import ArticleCard from "./ArticleCard";

const ProfileDetail = ({props, user, disconnect}) => {

    const [articleFound, setArticleFound] = useState(false);
    const [articles, setArticles] = useState([]);
    const [filteredArticle, setFilteredArticle] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3002/articles?user=" + user._id).then(res => {
            const articles = res.data;
            setArticleFound(true);
            setArticles(articles);
            setFilteredArticle(articles);
        });
    });

    function getFilteredArticles(e) {
        setFilteredArticle(articles.filter((article) => {
            let articleTitle = article.title.toLowerCase();
            return articleTitle.indexOf(e.target.value.toLowerCase()) !== -1
        }));
    }

    function getArticleType(type) {
        switch (type) {
            case "photo":
                return "Photo";
            case "video":
                return "Video";
            case "music":
                return "Musique";
            case "book":
                return "Livre";
            default:
                return "Livre";
        }
    }

    const handleClick = e => {
        e.preventDefault();
        disconnect();
        props.history.push('/');
    };

    return (
        <>
            <Segment>
                <h1>Bonjour {user.fullname} !</h1>

                <Button animated onClick={handleClick}>
                    <Button.Content visible>Se déconnecter</Button.Content>
                    <Button.Content hidden>
                        <Icon name="user close"/>
                    </Button.Content>
                </Button>
            </Segment>
            <div className={"articles-div"}>
                <h3>Mes ventes</h3>
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
                                {filteredArticle.articles.map(article => (
                                    <Grid.Column key={article._id}>
                                        <Segment style={{height: "26em"}}>
                                            {article.nbSell} {getArticleType(article.type)} vendus
                                            {article.nbRemain} {getArticleType(article.type)} restant
                                            <ArticleCard data={article} type={article.type}
                                                         typeLabel={getArticleType(article.type)}/>
                                        </Segment>
                                    </Grid.Column>
                                ))}
                            </Grid>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};
export default ProfileDetail;