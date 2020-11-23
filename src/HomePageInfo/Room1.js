import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Carousel } from 'antd';
import '../css/roomInfo.css';
import room1 from '../img/room1/room.png';
import room1Pic1 from '../img/room1/1.jpg';
import room1Pic2 from '../img/room1/2.jpg';
import room1Pic3 from '../img/room1/3.jpg';


class Room1 extends React.Component {
    render() {
        return (
            <div>
                <h1><b id="roomTLB">Standard</b></h1>
                <h1><b id="priceLB">400 บาท/คืน</b></h1>
                <hr class="w3-round"></hr>
                <div>
                    <div class="row align-items-center no-gutters mb-4 mb-lg-5">
                        <div class="col-xl-8 col-lg-7">
                            <Carousel autoplay effect="fade">
                                <div>
                                    <img id="imgInfo" src={room1} />
                                </div>
                                <div>
                                    <img id="imgInfo" src={room1Pic1} />
                                </div>
                                <div>
                                    <img id="imgInfo" src={room1Pic2} />
                                </div>
                                <div>
                                    <img id="imgInfo" src={room1Pic3} />
                                </div>
                           
                            </Carousel>
                        </div>
                        <div class="col-xl-4 col-lg-5">
                            <div class="featured-text text-center text-lg-left">
                                <h4 class="headLabel">Standard</h4>
                                <p class="description">เพิ่มความเป็นตัวกับครอบครัวมากยิ่งขึ้น เหมาะกับคนที่มาครอบครัวเดียว  ราคาเพียง 400 บาทต่อคืน</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create()(Room1);