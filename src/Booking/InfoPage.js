import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Menu, Modal } from 'antd';
import '../css/BookingPage.css';
import FormInfo from './FormInfo';
import logo from '../img/resort/logo.png'
import qrCode from '../img/resort/qrCode.jpg';

class InfoPage extends React.Component {

    render() {
        return (
            <div>
                <div class="sidenavBooking">
                    <div>
                        <img src={logo} class="logo" />
                        {/* <img src={qrCode} class="qr" /> */}
                    </div>
                </div>
                <div class="w3-container" id="containerShow">
                    <h1><b class="firstCha">W</b><b class="w3-jumbo">ong<b class="firstCha">N</b>ok</b></h1>
                    <h1><b class="headLabel">กรุณากรอกข้อมูลของท่าน</b></h1>
                    <hr class="w3-round"></hr>
                    <div>
                        <FormInfo />
                    </div>
                </div>

            </div>
        );
    }
}
export default InfoPage;