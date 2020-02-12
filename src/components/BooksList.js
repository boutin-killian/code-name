import React, {useState, useEffect} from "react";
import axios from "axios";
import {Grid, Segment} from "semantic-ui-react";
import ArticleCard from "./ArticleCard";

const BooksList = (props) => {

    const [bookFound, setMusicFound] = useState([]);
    const [books, setMusics] = useState([]);
    const [filteredMusic, setFilteredMusic] = useState([]);

    useEffect(() => {
        setMusicFound(false);
        axios.get("http://localhost:3002/articles/book").then(res => {
            const books = res.data;
            setMusicFound(true);
            setMusics(books);
            setFilteredMusic(books);
        });
    }, []);

    function getFilteredMusics(e) {
        setFilteredMusic(books.filter((book) => {
            let bookTitle = book.title.toLowerCase();
            return bookTitle.indexOf(e.target.value.toLowerCase()) !== -1
        }));
    }

    return (
        <div className={"articles-div"}>
            <h3>Livres</h3>
            {!bookFound ? (
                <div>Chargement des livres...</div>
            ) : (
                <div>
                    <div className={"filter-div"}>
                        <label htmlFor="filter">Filtre par titre: </label>
                        <input type="text" id="filter"
                               onChange={getFilteredMusics}/>
                    </div>
                    {filteredMusic.length === 0 ? (
                        <div>Aucun livre trouvé.</div>
                    ) : (
                        <Grid columns={3} doubling stackable>
                            {filteredMusic.articles.map(book => (
                                <Grid.Column key={book.id}>
                                    <Segment style={{height: "26em"}}>
                                        <ArticleCard data={book} type={book.type} typeLabel={"Livre"}/>
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

export default BooksList;
