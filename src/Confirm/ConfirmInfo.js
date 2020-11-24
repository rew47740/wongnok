import React, { Component } from 'react';
import "antd/dist/antd.css";
import { Result, Icon, Button, Alert, Card, Modal } from "antd";
import Confirm from './Confirm'
import kbank from '../img/logoBank/kbank.png';
import krungthai from '../img/logoBank/krungthai.png';
import krungsri from '../img/logoBank/krungsri.png';
import logo from '../img/resort/logo.png'


class ConfirmInfo extends React.Component {

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onClick = () => {
    window.location.href = "/"
  }
  render() {
    return (
      <div style={{ marginLeft: '15%' }}>
        <Modal
          visible={this.state.visible}
          footer={null}
          maskClosable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div style={{ fontFamily: "Kanit, sans-serif" }}>
            <Confirm style={{ marginLeft: '5%' }} />
          </div>
        </Modal>
        <Card style={{ width: 1000, height: 680 }}>
          <Result
            icon={<img style={{ width: '20%' }} src={logo} />}
            title="ขั้นตอนการชำระเงิน"
            style={{ fontFamily: "Kanit, sans-serif" }}
            extra={[
              <Alert
                style={{ margin: "16px 0", fontFamily: "Kanit, sans-serif" }}
                message="การจองที่พักจะเสร็จสิ้นหลังจากที่ท่านทำการชำระเงินค่ามัดจำ โปรดทำการชำระเงินมัดจำหลังการจองที่พักภายใน 24 ชั่วโมง"
              />
            ]}
          />
          <div>
            <img style={{ width: '5%', marginLeft: '22%', marginRight: '3%', marginBottom: '2%' }} src={kbank} /><span style={{ fontFamily: "Kanit, sans-serif" }}>ธนาคารกสิกรไทย ชื่อบัญชี : พิชาญุตย์ แมนซาโน:  115-2-88899-9</span>
          </div>
          <div>
            <img style={{ width: '5%', marginLeft: '22%', marginRight: '3%', marginBottom: '2%' }} src={krungthai} /><span style={{ fontFamily: "Kanit, sans-serif" }}>ธนาคารกรุงไทย ชื่อบัญชี : พิชาญุตย์ แมนซาโน : 789-6-65984-4</span>
          </div>
          <div>
            <img style={{ width: '5%', marginLeft: '22%', marginRight: '3%', marginBottom: '2%' }} src={krungsri} /><span style={{ fontFamily: "Kanit, sans-serif" }}>ธนาคารกรุงศรีอยุธยา ชื่อบัญชี : พิชาญุตย์ แมนซาโน : 567-1-50878-1</span>
          </div>
          <div style={{ marginTop: '1%' }}>
            <Button className="add-receipt" onClick={this.showModal} type="primary" style={{ marginLeft: '30%', marginRight: '3%', fontFamily: "Kanit, sans-serif" }} >อัพโหลดสลิปโอนเงินค่ามัดจำ</Button>
            <Button onClick={this.onClick} style={{ marginRight: '3%', fontFamily: "Kanit, sans-serif" }} >กลับไปยังหน้าแรก</Button>
          </div>
        </Card>
      </div>

    );
  }
}
export default ConfirmInfo;