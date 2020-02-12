import React, {useState, useEffect} from "react";
import axios from "axios";
import {Grid, Segment} from "semantic-ui-react";
import ArticleCard from "./ArticleCard";

const MusicsList = (props) => {

    const [musicFound, setMusicFound] = useState([]);
    const [musics, setMusics] = useState([]);
    const [filteredMusic, setFilteredMusic] = useState([]);

    useEffect(() => {
        setMusicFound(false);
        axios.get("http://localhost:3002/articles/music").then(res => {
            const musics = res.data;
            setMusicFound(true);
            setMusics(musics);
            setFilteredMusic(musics);
        });
    }, []);

    function getFilteredMusics(e) {
        setFilteredMusic(musics.filter((music) => {
            let musicTitle = music.title.toLowerCase();
            return musicTitle.indexOf(e.target.value.toLowerCase()) !== -1
        }));
    }

    return (
        <div className={"articles-div"}>
            <h3>Musiques</h3>
            {!musicFound ? (
                <div>Chargement des musiques...</div>
            ) : (
                <div>
                    <div className={"filter-div"}>
                        <label htmlFor="filter">Filtre par titre: </label>
                        <input type="text" id="filter"
                               onChange={getFilteredMusics}/>
                    </div>
                    {filteredMusic.length === 0 ? (
                        <div>Aucune musique trouvée.</div>
                    ) : (
                        <Grid columns={3} doubling stackable>
                            {filteredMusic.articles.map(music => (
                                <Grid.Column key={music.id}>
                                    <Segment style={{height: "26em"}}>
                                        <ArticleCard data={music} type={music.type} typeLabel={"Musique"}/>
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

export default MusicsList;