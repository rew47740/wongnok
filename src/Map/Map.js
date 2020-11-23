import React from 'react';
import MapImg from '../img/resort/map.png';
import '../css/map.css';
import MapBox from './MapBox';
import '../css/MapBox.css'
import {Card} from 'antd';

class MapResort extends React.Component {
    render(){
        return(
            <div>
                <h1><b id="roomTLB">แผนที่และการเดินทาง</b></h1>
                <hr class="w3-round"></hr>
                <img src={MapImg} class="setImgMap"/>
                <h2 style={{textAlign:"center", marginButton:"3%", fontFamily: "Poppins, sans-serif"}}>Google Map </h2>
                <div id="setMap">
                    <Card style={{width: 900 ,height: 600}}>
                        <MapBox/>
                    </Card>
                </div>
            </div>
        );
    }
}

export default MapResort;