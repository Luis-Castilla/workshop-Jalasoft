import React, { Component } from "react";
import axios from 'axios';

class Stats extends Component {
    componentDidMount() {
        console.log(mostrarStats(this.props.lyrics));
    }
    render() {
        try {
            const stats = this.props.stats.body;
            const totalLines = stats.totalLines;
            const totalWords = stats.totalWords;
            //console.log(arrProductos);
            return (
                <div>
                    <p>Total words:
                        {totalWords}
                    </p>
                    <p>Total Lines:
                        {totalLines}
                    </p>
                </div>
            );
        } catch (error) {
            return (
                <div>
                    
                </div>
            );
        }
    }
}

// state
const mapStateToProps = (state) => ({
    totalWords: state.stats.totalWords,
    totalLines: state.stats.totalLines,
});
const mostrarStats = async (lyrics) => {
    return await axios.post('http://localhost:5000/api/stats', {
        lyrics: lyrics
    })
}

export default (Stats);


  //http://localhost:5000/api/stats