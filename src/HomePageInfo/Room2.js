import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Carousel } from 'antd';
import '../css/roomInfo.css';
import room2 from '../img/room2/room.png';
import room2Pic1 from '../img/room2/1.jpg';
import room2Pic2 from '../img/room2/2.jpg';
import room2Pic3 from '../img/room2/3.jpg';

class Room2 extends React.Component {
    render() {
        return (
            <div>
                <h1><b id="roomTLB">Deluxe</b></h1>
                <h1><b id="priceLB">500 บาท/คืน</b></h1>
                <hr class="w3-round"></hr>
                <div>
                    <div class="row align-items-center no-gutters mb-4 mb-lg-5">
                        <div class="col-xl-8 col-lg-7">
                            <Carousel autoplay effect="fade">
                                <div>
                                    <img id="imgInfo" src={room2} />
                                </div>
                                <div>
                                    <img id="imgInfo" src={room2Pic1} />
                                </div>
                                <div>
                                    <img id="imgInfo" src={room2Pic2} />
                                </div>
                                <div>
                                    <img id="imgInfo" src={room2Pic3} />
                                </div>
                            </Carousel>
                        </div>
                        <div class="col-xl-4 col-lg-5">
                            <div class="featured-text text-center text-lg-left">
                                <h4 class="headLabel"> Deluxe</h4>
                                <p class="description">เหมาะสำหรับเข้าพักหลายคน สะดวกต่อคนที่มากับเพื่อนหรือครอบครัว ราคาเพียง 500 บาทต่อคืน</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create()(Room2);