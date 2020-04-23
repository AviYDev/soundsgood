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
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import ScaleLoader from "react-spinners/ScaleLoader";
import "./Ranking.css";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { css } from "@emotion/core";




class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            result: [],
            valid : false,
            load : false,
            load2 : false,
            loader : false,
            selected: "",
            column:[],
            data:[],
            toDisplay:[],
            visible: false,
            visible2: false
        }
        this.validate = this.validate.bind(this);

    }

    componentDidMount() {
            this.getSongs();
            this.setState({result: {"cross_val":{"gaussian":-242.67,"knn":65.79,"logistique_reg":65.86,"tree":58.31},"result":{"gaussian":-2.62,"knn":60.89,"logistique_reg":58.91,"tree":57.43},"train":{"gaussian":6.65,"knn":73.72,"logistique_reg":65.73,"tree":87.93}}})
           // this.getResult();
    }

    show() {
        this.setState({ loader: true});
        this.getResult();
    }

    hide() {
        this.setState({ visible: false });
    }

    show2() {
        this.setState({  visible2: true});
    }

    hide2() {
        this.setState({ visible2: false });
    }

    getResult(){
        fetch('http://60d76c39.ngrok.io/result',{
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
                this.setState({ loader: false });
                this.setState({ load2: true });
                this.setState({ visible: true });
            })

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
        const isLoad2 =  this.state.load2;
        const loader =  this.state.loader;
        const result = this.state.result;
            if (this.state.valid) {
                return (<Ranking songs={this.state.songs}/>);
            } else {
                return (
                    <div>




                            { isLoad ?
                                <div className={"Table"}>
                                <div className={"fade-in"}>
                                    Song Dataset
                                <TableContainer>
                                    <Table >

                                        <TableBody>
                                            {this.state.toDisplay.map((row) => (
                                                <TableRow     hover
                                                              tabIndex={-1}
                                                              key={row.id}
                                                        >
                                                    <TableCell  component="th" scope="row">
                                                        {row.song_title}
                                                    </TableCell>
                                                    <TableCell  align="right"align="right">{row.artist}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>




                                    { loader ?
                                        <div className="sweet-loading2">
                                            <ScaleLoader
                                                css={override}
                                                size={300}
                                                color={"#ffffff"}
                                                loading={this.state.loading}
                                            />
                                        </div>
                                        :
<div>
    <button className={'exec-button'} onClick={this.show.bind(this)}>
        Validate
    </button>
    { isLoad2 ?
                                        <Rodal className={"rodal"} visible={this.state.visible}
                                               onClose={this.hide.bind(this)}>
                                            <div className={"content"}>
                                                <div className={"result"}><p>Training Test</p>
                                                    <br/><br/>

                                                    <p>KNN : {result.train.knn}</p>
                                                    <p>Logistique Regression : {result.train.logistique_reg}</p>
                                                    <p>Decision Tree : {result.train.tree}</p>
                                                </div>
                                                <div className={"result"}><p>Cross Validation Test</p>
                                                    <br/>
                                                    <br/>

                                                    <p>KNN : {result.cross_val.knn}</p>
                                                    <p>Logistique Regression : {result.cross_val.logistique_reg}</p>
                                                    <p>Decision Tree : {result.cross_val.tree}</p>
                                                </div>

                                                <div className={"result"}><p>Result test</p>
                                                    <br/><br/>

                                                    <p>KNN : {result.result.knn}</p>
                                                    <p>Logistique Regression : {result.result.logistique_reg}</p>
                                                    <p>Decision Tree : {result.result.tree}</p>



                                                </div><Rodal className={"rodal"} visible={this.state.visible2}
                                                             onClose={this.hide2.bind(this)}>
                                                <img style={{width:'45%'}} alt="HeatMap" src="https://drive.google.com/uc?export=view&id=1fCLzxpiM8vIO04yzSX14Lul1nZubBZe9"></img>
                                                <img style={{width:'45%'}} alt="Correlation" src="https://drive.google.com/uc?export=view&id=1-00COcjbxMK93ELVPM3bneuW6uL_Gd6I"></img>
                                              </Rodal>
                                            </div>
                                            <button style={{marginTop:"10%"}}className={'exec-button'} onClick={this.show2.bind(this)}>
                                                More infos
                                            </button>
                                        </Rodal>  :  <div> </div>}
</div>
                                    }

                                </div>
                                </div>

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


export default Container;

