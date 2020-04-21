import React, {
    Component,
} from 'react';
import "./Container.css";
import { TransitionGroup, CSSTransition } from 'react-transition-group'




class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: this.props.songs,
        }
        this.handleAdd= this.handleAdd.bind(this);

    }

    componentDidMount() {
           // this.getSongs();
    }

    handleRemove(i) {
        let newItems = this.state.songs.slice();
        newItems.splice(i, 1);
        this.setState({songs: newItems});
    }

    handleAdd() {
        let newItems = this.state.songs;


        newItems.push({
            "title": "Title",
            "artist": "artiste",
            "order": "0"
        })


        this.setState({songs: newItems});
    }

    getSongs(){
        fetch('http://localhost:3001/spotify/',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data.songs)
                this.setState({songs : data.songs});
            })

    }
    render() {




        const items = this.state.songs.map((item, i) => (
            <CSSTransition appear timeout={{appear:500,enter:200,exit:1000}} classNames="pagefade" key={i}>
            <div  className={"elem"} key={item.order}  onClick={() => this.handleRemove(i)}>
                {item.song_title} by {item.artist}
            </div>
    </CSSTransition>
            // return container;
        ));
      //  console.log(this.state.songs);
        return(


            <div>

                <button onClick={this.handleAdd}>Add Song</button>
        <TransitionGroup


        transition={"TopList"}>
            {items}
        </TransitionGroup>
            </div>
    );
    }
}


export default Container;