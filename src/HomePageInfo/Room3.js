import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Carousel } from 'antd';
import '../css/roomInfo.css';
import room3 from '../img/room3/room.png';
import room3Pic1 from '../img/room3/1.jpg';
import room3Pic2 from '../img/room3/2.jpg';
import room3Pic3 from '../img/room3/3.jpg';
import room3Pic4 from '../img/room3/4.jpg';
import room3Pic5 from '../img/room3/5.jpg';

class Room3 extends React.Component {
    render() {
        return (
            <div>
                <h1><b id="roomTLB">Suite</b></h1>
                <h1><b id="priceLB">600 บาท/คืน</b></h1>
                <hr class="w3-round"></hr>
                <div>
                    <div class="row align-items-center no-gutters mb-4 mb-lg-5">
                        <div class="col-xl-8 col-lg-7">
                            <Carousel autoplay effect="fade">
                                <div>
                                    <img id="imgInfo" src={room3} />
                                </div>
                                <div>
                                    <img id="imgInfo" src={room3Pic1} />
                                </div>
                                <div>
                                    <img id="imgInfo" src={room3Pic2} />
                                </div>
                                <div>
                                    <img id="imgInfo" src={room3Pic3} />
                                </div>
                                <div>
                                    <img id="imgInfo" src={room3Pic4} />
                                </div>
                                <div>
                                    <img id="imgInfo" src={room3Pic5} />
                                </div>
                            </Carousel>
                        </div>
                        <div class="col-xl-4 col-lg-5">
                            <div class="featured-text text-center text-lg-left">
                                <h4 class="headLabel">Suite</h4>
                                <p class="description">มีขนาดใหญ่มากขึ้นกว่าห้องอื่นๆ สะดวกต่อครอบครัวที่มาพักกันเป็นครอบครัวคู่ หรือผู้ที่มาเป็นกลุ่มใหญ่ ราคาเพียง 600 บาทต่อคืน</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create()(Room3);