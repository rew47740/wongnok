import React, { Component } from 'react';
import "antd/dist/antd.css";
import { Form, Result, Button, Icon, Typography, Card } from "antd";


const { Paragraph } = Typography;

class FinishPayment extends React.Component {

    componentDidMount() {
        setTimeout(function () {
            window.location.href = '/'
          }, 3000);
    }
    render() {
        return (
            <div style={{ fontFamily: "Kanit, sans-serif", marginLeft: '15%' }}>
                <Card style={{ width: 1000, height: 650 }}>
                    <Result
                        style={{ marginTop: '10%' }}
                        status="success"
                        title="การจองเสร็จสิ้น"
                        subTitle="ระบบจะทำการเก็บข้อมูลการจองที่พักของท่าน ขอบคุณที่เลือกใช้บริการรีสอร์ทของเรา "
                        extra={[
                            <Paragraph>
                                <Icon type="info-circle" /> ท่านสามารถเช็คอินในวันที่ได้ทำการจองไว้ตั้งแต่เวลา 12:00 น. เป็นต้นไป
                            </Paragraph>,
                            <Paragraph>
                                <Icon type="info-circle" /> ในกรณีที่ท่านไม่มาเช็คอิน การจองของท่านจะถูกยกเลิก
                                และท่านไม่สามารถขอรับเงินมัดจำคืนได้
                            </Paragraph>,
                            <Paragraph>
                                <Icon style={{fontSize: '30px'}} type="loading" /><span> กรุณารอสักครู่ระบบกำลังนำท่านกลับเข้าสู่หน้าหลัก</span>
                            </Paragraph>
                        ]}
                    />
                </Card>
            </div>
        );
    }
}
export default FinishPayment;