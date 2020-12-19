import React from 'react';
import Stats from '../stats/Stats'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.state = {
            values: {
                autor: '',
                song: '',
                lyrics: ''
            }
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            values: {
                ...this.state.values,
                [name]: value
            }
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        const autor = encodeURIComponent(this.state.values.autor);
        const song = encodeURIComponent(this.state.values.song);
        console.log(autor, song);
        const headers = {'content-type' : 'application/json'};
        const response = await fetch(`https://api.lyrics.ovh/v1/${autor}/${song}`, {headers});
        // https://api.lyrics.ovh/v1/${autor}/${song}
        const lyrics = await JSON.stringify(response);

        console.log(response, lyrics);
        this.setState({
            values: {
                lyrics: lyrics
            }
        })
    }

    render() {
        const { autor, song, lyrics } = this.state.values

        return (
            <div>
                <h1>Lyrics Search</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Autor:
                    <input
                                type="text"
                                name="autor"
                                value={autor}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>Song:
                    <input
                                type="text"
                                name="song"
                                value={song}
                                onChange={this.handleChange}
                            />
                        </label>
                        <div>
                        </div>
                    </div>
                    <button type="submit">Send</button>
                </form>
                <div>
                    <h1>{lyrics}</h1>
                </div>
                <div>
                    <h1> STATS </h1>
                    <Stats lyrics={lyrics} />
                </div>
            </div>

        )
    }
}

export default SearchBar