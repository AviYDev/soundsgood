import React, {
    Component,
} from 'react';
import "./Container.css";
import  Ranking from './Ranking';
import csvjson from "../csvjson.json";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

import TableRow from '@material-ui/core/TableRow';

import Checkbox from '@material-ui/core/Checkbox';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/core";




class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            valid : false,
            load : false,
            selected: "",
            column:[],
            data:[],
            toDisplay:[],
        }
        this.validate = this.validate.bind(this);

    }

    componentDidMount() {
            this.getSongs();
    }




    getSongs(){
        fetch('http://localhost:3002/spotify/',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then((data) => {
                data = csvjson.spotify;
                this.setState({songs : data});
                this.setState({toDisplay : data});



                console.log(this.state.column);


                this.setState({load: true});
               /* for (const property in this.state.songs ) {
                    let newItems = this.state.data;

                    newItems.push({
                        id : property.id,
                        title: property.song_title,
                        artist: property.artist,

                    })

                    //console.log(newItems);
                    this.setState({data: newItems});

                }*/




                })

    }


    validate() {
        this.setState({valid: !this.state.valid});
    }

    render() {
        const override = css`
  margin: auto;
  position: absolute;
  border-color: red;
`;
        const isLoad =  this.state.load;
            if (this.state.valid) {
                return (<Ranking songs={this.state.songs}/>);
            } else {
                return (
                    <div>




                            { isLoad ?
                                <div className={"Table"}>
                                <div className={"fade-in"}>
                                    Song search
                                <TableContainer >
                                    <Table >

                                        <TableBody>
                                            {this.state.toDisplay.map((row) => (
                                                <TableRow     hover

                                                              role="checkbox"
                                                              tabIndex={-1}
                                                              key={row.id}
                                                        ><TableCell padding="checkbox">
                                                    <Checkbox
                                                        value={row.id}
                                                        inputProps={{ 'aria-label': row.song_title }}
                                                    />
                                                </TableCell>
                                                    <TableCell  component="th" scope="row">
                                                        {row.song_title}
                                                    </TableCell>
                                                    <TableCell  align="right"align="right">{row.artist}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>


                                    <button className={'landing-button'} onClick={this.validate}>
                                       Validate
                                    </button>
                                </div>
                                </div>

                       //             <MaterialTable
                         //               title="Editable Example"
                           //             columns={this.state.column}
                             //           data={this.state.data}

                               //     />
                                :
                                <div className="sweet-loading">
                                    <ScaleLoader
                                        css={override}
                                        size={300}
                                        color={"#ffffff"}
                                        loading={this.state.loading}
                                    />
                                </div>
                            }


                    </div>
                );
            }
        };

}

/*   <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                        <Button variant="outline-warning">Search</Button>*/

export default Container;


/*      <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                    </header>*/