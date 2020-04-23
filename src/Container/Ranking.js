import React, {
    Component,
} from 'react';
import "./Container.css";
import "./Ranking.css";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group'




class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: "",
            visible: false
        }

    }

    componentDidMount() {
        //    this.getSongs();
    }

    handleRemove(i) {
        let newItems = this.state.songs.slice();
        newItems.splice(i, 1);
        this.setState({songs: newItems});
    }



show() {
 this.getResult();
}

hide() {
    this.setState({ visible: false });
}


    getResult(){
        fetch('http://5486f8f8.ngrok.io/result',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                this.setState({result : data});
                this.setState({ visible: true });
            })

    }
    render() {




/*        const items = this.state.songs.map((item, i) => (
            <CSSTransition appear timeout={{appear:500,enter:200,exit:1000}} classNames="pagefade" key={i}>
            <div  className={"elem"} key={item.order}  onClick={() => this.handleRemove(i)}>
                {item.song_title} by {item.artist}
            </div>
    </CSSTransition>
            // return container;
        ));*/
      //  console.log(this.state.songs);{items}
        return(

            <div>
                <button onClick={this.show.bind(this)}>show</button>


                <Rodal className={"rodal"} visible={this.state.visible} onClose={this.hide.bind(this)}>
                    <div className={"content"}>
                        <div className={"result"}><p>Training Test</p></div>

                        <div className={"result"}><p>Cross Validation Test</p></div>


                        <div className={"result"}><p>Result test</p></div>

                    </div>
                </Rodal>
            </div>
       );
    }
}


export default Container;