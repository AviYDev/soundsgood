import React, {Component} from 'react';
import './App.css';
import  Container from './Container/Container';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            launch : false,
        }
        this.connexion = this.connexion.bind(this);
    }
    connexion() {
        this.setState({launch: !this.state.launch});
    }

    render() {

        const isLaunched =  this.state.launch;
        return (
            <div className="App">
                {
                    isLaunched
                        ? <Container/>
                        : <div className={"landing"}><button className={'landing-button'} onClick={this.connexion}>
                            ENTER
                        </button>

                            <p className={"author"}>Avinash Yoganandan&nbsp;&nbsp;Issam Tebib&nbsp;&nbsp;Iman ElAzhari</p>
                        </div>
                }
            </div>
        );
    };
}

export default App;
