import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Card, Col, Row, message, Anchor } from 'antd';
import '../css/FormInfo.css';
import axios from 'axios';
const { Link } = Anchor;



class FormInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            phoneNum: '',
            email: '',
            details: '-',
            cost: 0,
            dateCheckIn: '',
            dateCheckOut: '',
            reserveA: 0,
            reserveB: 0,
            reserveC: 0,
            reserveD: 0,
            reserveE: 0,
            reserveF: 0,
            status: '',
            roomALabel: '',
            roomBLabel: '',
            roomCLabel: '',
            roomDLabel: '',
            roomELabel: '',
            roomFLabel: '',
            dateCount: 0,
            showForm: 'none',
            showFirstForm: '',
            showOldCusForm: 'none',
            showButtonForm: '',
            phoneCheck: '',
            phoneError: ''

        }
    }

    componentDidMount() {
        

        var rand = Math.floor(1000 + Math.random() * 9000)
        this.setState({ id: rand })
        axios.get('/findTempData').then(resp => {
            this.setState({
                cost: resp.data[0].cost,
                dateCheckIn: resp.data[0].dateCheckIn,
                dateCheckOut: resp.data[0].dateCheckOut,
                reserveA: resp.data[0].reserveA,
                reserveB: resp.data[0].reserveB,
                reserveC: resp.data[0].reserveC,
                reserveD: resp.data[0].reserveD,
                reserveE: resp.data[0].reserveE,
                reserveF: resp.data[0].reserveF,
                dateCount: resp.data[0].dateCount,
                amount:this.state.count*this.state.dateCount
            })
            if (resp.data[0].reserveA !== 0) {
                const roomALabel = "Standard (400 บาท/คืน) \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + this.state.reserveA + "   ห้อง";
                this.setState({ roomALabel: roomALabel })
            }
            if (resp.data[0].reserveB !== 0) {
                const roomBLabel = "Deluxe (500 บาท/คืน) \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + this.state.reserveB + "   ห้อง";
                this.setState({ roomBLabel: roomBLabel })
            }
            if (resp.data[0].reserveC !== 0) {
                const roomCLabel = "Suite (600 บาท/คืน) \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + this.state.reserveC + "   ห้อง";
                this.setState({ roomCLabel: roomCLabel })
            }
            // if (resp.data[0].reserveD !== 0) {
            //     const roomDLabel = "บ้านริมน้ำ (700 บาท/คืน) \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + this.state.reserveD + "   ห้อง";
            //     this.setState({ roomDLabel: roomDLabel })
            // }
            // if (resp.data[0].reserveE !== 0) {
            //     const roomELabel = "เรือนไทยหลังเล็ก (500 บาท/คืน) \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + this.state.reserveE + "   ห้อง";
            //     this.setState({ roomELabel: roomELabel })
            // }
            // if (resp.data[0].reserveF !== 0) {
            //     const roomFLabel = "เรือนไทยหลังใหญ่ (800 บาท/คืน) \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + this.state.reserveF + "   ห้อง";
            //     this.setState({ roomFLabel: roomFLabel })
            // }
        })
    }


    showState = (e) => {
        console.log(this.state.name)
        console.log(this.state.phoneNum)
        console.log(this.state.email)
        console.log(this.state.cost)
        console.log(this.state.dateCheckIn)
        console.log(this.state.dateCheckOut)
        console.log(this.state.reserveA)
        console.log(this.state.reserveB)
        console.log(this.state.reserveC)
        console.log(this.state.reserveD)
        console.log(this.state.reserveE)
        console.log(this.state.reserveF)
    }

    handleShowOldCustomer = e => {
        e.preventDefault()
        var count = this.state.phoneCheck
        console.log(count.length)

    }

    handleSubmit2 = e => {
        e.preventDefault();
        const status = 'จองที่พัก';
        const { id, name,phoneNum, email, details, cost, dateCheckIn, dateCheckOut, reserveA, reserveB, reserveC,} = this.state
        // let amount  = this.state.count*this.state.dateCount;
        axios.post('/addBookingInfo', ({ id, name, phoneNum, email, details, cost, dateCheckIn, dateCheckOut, reserveA, reserveB, reserveC,status })).then(res => { console.log(res) })
        axios.post('/AddStatus', ({ id, name, phoneNum, status }))
        message
            .loading('ระบบกำลังบันทึกข้อมูล', 2)
            .then(() => message.success('บันทึกข้อมูลเสร็จสิ้น', 2))
        setTimeout(function () {
            window.location.href = '/ComfirmInfo'
        }, 3000);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const name = values.name;
                const phoneNum = values.phone;
                const email = values.email;
                const status = 'จองที่พัก';
                console.log(name)
                console.log(phoneNum)
                console.log(email)

                const { id, details, cost, dateCheckIn, dateCheckOut, reserveA, reserveB, reserveC} = this.state
                axios.post('/addBookingInfo', ({ id, name, phoneNum, email, details, cost, dateCheckIn, dateCheckOut, reserveA, reserveB, reserveC,status })).then(res => { console.log(res) })
                axios.post('/AddStatus', ({ id, name, phoneNum, status }))
                message
                    .loading('ระบบกำลังบันทึกข้อมูล', 2)
                    .then(() => message.success('บันทึกข้อมูลเสร็จสิ้น', 2))
                setTimeout(function () {
                    window.location.href = '/ComfirmInfo'
                }, 3000);
            }
        });
    };

    onchangeTextInput = (value) => {
        console.log(value.target.value)
        this.setState({
            details: value.target.value
        })
    }

    showForm = (e) => {
        this.setState({
            showForm: '',
            showFirstForm: 'none'
        })
    }

    handlePhoneCheckOnChange = event => {
        this.setState({ phoneCheck: event.target.value }, () => {
            this.validatePhoneNum();
        });
    }

    validatePhoneNum = () => {
        const { phoneCheck } = this.state;
        this.setState({
            phoneError:
                phoneCheck.length == 10 ? null : 'หมายเลขโทรศัพท์ไม่ถูกต้อง'
        });
    }

    handleSubmitPhone = event => {
        event.preventDefault();
        console.log(this.state.phoneCheck)
        if (this.state.phoneCheck.length == 10) {
            const phoneNum = this.state.phoneCheck
            axios.get(`/findBookingInfoByPhone/${phoneNum}`, ({ phoneNum })).then(resp => {
                this.setState({
                    name: resp.data.name,
                    email: resp.data.email,
                    phoneNum: resp.data.phoneNum
                })
                console.log(resp.data.name)
                console.log(this.state.email)
                if (resp.data.name == null) {
                    message.error("ไม่มีข้อมูลของท่าน")
                    this.setState({
                        showButtonForm: '',
                        showOldCusForm: 'none'
                    })
                } else {
                    this.setState({
                        showButtonForm: 'none',
                        showOldCusForm: ''
                    })
                }

            })


        } else if (this.state.phoneCheck.length == 0) {
            message.error('กรุณากรอกหมายเลขโทรศัพท์')
        }
        else {
            message.error('หมายเลขโทรศัพท์ไม่ถูกต้อง')
        }
    };

    toggleShow = e => {
        this.setState({
            showFirstForm: '',
            showForm: 'none'
        })
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };

        return (
            <div>
                <div>
                    <Card style={{ width: 1080, backgroundColor: '#FFE8D8' }}>

                        <Row>
                            <Col span={13}>
                                <Card style={{ width: 550, height: 350, marginTop: '2%' }}>
                                    <Form {...formItemLayout} onSubmit={this.handleSubmit} >

                                        <div style={{ fontFamily: "Kanit, sans-serif"}} >
                                        <div style={{color: 'red', fontSize: '20px'}}>รหัสการจองห้องพัก {this.state.id} <div style={{fontSize:'12px'}}>*โปรดจดบันทึกรหัสการจองเพื่อใช้ในการยืนยันสลิปเงินมัดจำ</div></div>
                                            <Form.Item label="ชื่อผู้จอง :" hasFeedback>
                                                {getFieldDecorator('name', {
                                                    rules: [{ required: true, message: 'กรุณากรอกชื่อ-นามสกุลของท่าน' }],
                                                })(<Input style={{ width: '8cm' }} onKeyDown={(evt) => (evt.key === '0' || evt.key === '1' || evt.key === '2'
                                                    || evt.key === '3' || evt.key === '4' || evt.key === '5' || evt.key === '6' || evt.key === '7'
                                                    || evt.key === '8' || evt.key === '9' || evt.key === '.' || evt.key === '/' || evt.key === '*' || evt.key === '-'
                                                    || evt.key === '+' || evt.key === '(' || evt.key === ')' || evt.key === '%' || evt.key === '$' || evt.key === '!'
                                                    || evt.key === '@' || evt.key === '#' || evt.key === '[' || evt.key === ']') || evt.key === '{'
                                                    || evt.key === '}' || evt.key === '?' || evt.key === '`' || evt.key === '฿' && evt.preventDefault()} />)}
                                            </Form.Item>
                                            <Form.Item label="หมายเลขติดต่อ :" hasFeedback>
                                                {getFieldDecorator('phone', {
                                                    rules: [{ max: 10, min: 10, message: 'หมายเลขโทรศัพท์ไม่ถูกต้อง' }, { required: true, message: 'กรุณากรอกหมายเลขโทรศัพท์ของท่าน' }],
                                                })(<Input style={{ width: '8cm' }} type='number' onKeyDown={(evt) => (evt.key === 'e' || evt.key === '.' || evt.key === '-') && evt.preventDefault()} />)}
                                            </Form.Item>
                                            <Form.Item label="E-mail" hasFeedback >
                                                {getFieldDecorator('email', {
                                                    rules: [
                                                        {
                                                            type: 'email',
                                                            message: 'รูปแบบของอีเมลไม่ถูกต้อง',
                                                        },
                                                        {
                                                            required: true,
                                                            message: 'กรุณากรอกอีเมลของท่าน',
                                                        },
                                                    ],
                                                })(<Input style={{ width: '8cm' }} />)}
                                            </Form.Item>
                                                {/* <Button  style={{ fontFamily: "Kanit, sans-serif", fontSize: '16px' }} type="link" onClick={(e) => this.toggleShow(e)}>กลับ</Button> */}
                                            
                                            <Button style={{ marginLeft: '28%', fontFamily: "Kanit, sans-serif", fontSize: '16px' }} type="primary" htmlType="submit">
                                                ยืนยันข้อมูล
                                            </Button>
                                            
                                        </div>
                                    </Form>
                                    <div style={{ fontFamily: "Kanit, sans-serif" }}>
                                        {/* <div style={{ marginBottom: '3%', color: 'black' }}>หากท่านเคยพักแล้วกรุณาใส่หมายเลขโทรศัพท์ของท่านเพื่อค้นหาข้อมูล</div> */}
                                        {/* <Input style={{ width: '8cm' }} type='number' onBlur={this.validatePhoneNum} onChange={(value) => this.handlePhoneCheckOnChange(value)} /> */}
                                        {/* <input
                                            type='number'
                                            name='phoneNum'
                                            className={`form-control ${this.state.phoneError ? 'is-invalid' : ''}`}
                                            id='phoneNum'
                                            placeholder='Enter Phone Number'
                                            value={this.state.phoneCheck}
                                            onChange={this.handlePhoneCheckOnChange}
                                            onBlur={this.validatePhoneNum}
                                            style={{ width: '10cm', marginLeft: '10%' }}
                                            onKeyDown={(evt) => (evt.key === 'e' || evt.key === '.' || evt.key === '-') && evt.preventDefault()} */}
                                        {/* /> */}
                                        {/* <div className='invalid-feedback' >{this.state.emailError}</div> */}
                                        {/* <Button style={{ marginTop: '3%', marginLeft: '40%', fontFamily: "Kanit, sans-serif" }} onClick={(e) => this.handleSubmitPhone(e)} >ค้นหา</Button> */}
                                        {/* <div style={{ fontSize: '18px'}} >
                                            <div style={{color: 'red'}}>รหัสการจองห้องพัก {this.state.id} <div style={{fontSize:'12px'}}>*โปรดจดบันทึกรหัสการจองเพื่อใช้ในการยืนยันสลิปเงินมัดจำ</div></div>
                                            <div>ชื่อผู้จอง : {this.state.name}</div>
                                            <div>หมายเลขโทรศัพท์ : {this.state.phoneNum}</div>
                                            <div>อีเมล : {this.state.email}</div>
                                            <Button style={{ fontFamily: "Kanit, sans-serif", marginLeft: '37%', marginTop: '2%' }} type='primary' onClick={(e) => this.handleSubmit2(e)}>ยืนยันข้อมูล</Button>
                                        </div> */}
                                        {/* <div style={{ display: this.state.showButtonForm }}> */}
                                            {/* <div style={{ marginTop: '5%', marginLeft: '5%', fontFamily: "Kanit, sans-serif", fontSize: '16px', color: 'coral' }} >หากท่านยังไม่เคยเข้าพักคลิกปุ่ม"ยังไม่เคยเข้าพัก"เพื่อกรอกข้อมูล</div> */}
                                            {/* <Button type="primary" style={{ marginTop: '5%', marginLeft: '35%', fontFamily: "Kanit, sans-serif" }} onClick={(e) => this.showForm(e)}>ยังไม่เคยเข้าพัก</Button> */}
                                        {/* </div> */}
                                    </div>
                                </Card>

                                <Card style={{ width: 550, height: 138, marginTop: '2%', fontFamily: "Kanit, sans-serif", fontSize: '20px' }}>
                                    <div style={{ textAlign: 'center' }}>ติดต่อสอบถาม</div>
                                    <div style={{ textAlign: 'center' }}>Line ID : @wongnokresident</div>
                                    <div style={{ textAlign: 'center' }}>หมายเลขติดต่อ : 02-900-0000</div>
                                </Card>

                            </Col>
                            <Col span={1}>
                                <Card style={{ width: 450, height: 450 }} >
                                    <div style={{ fontFamily: "Kanit, sans-serif", fontSize: '15px' }}>
                                        <div style={{ fontFamily: "Kanit, sans-serif", fontSize: '20px', textAlign: 'center' }}>ข้อมูลการเข้าพัก</div>
                                        <div>--------------------------------------------------</div>
                                        <Card style={{ height: 170 }}>
                                            <div>{this.state.roomALabel}</div>
                                            <div>{this.state.roomBLabel}</div>
                                            <div>{this.state.roomCLabel}</div>
                                            <div>{this.state.roomDLabel}</div>
                                            <div>{this.state.roomELabel}</div>
                                            <div>{this.state.roomFLabel}</div>
                                        </Card>
                                        <div>--------------------------------------------------</div>
                                        <span style={{ marginRight: '60%' }}>วันที่เช็คอิน</span><span>{this.state.dateCheckIn}</span>
                                        <div><span style={{ marginRight: '57%' }}>วันที่เช็คเอาท์</span><span>{this.state.dateCheckOut}</span></div>
                                        <div><span style={{ marginRight: '57%' }}>ระยะเวลาเข้าพัก</span><span>{this.state.dateCount} คืน</span></div>
                                        <div>--------------------------------------------------</div>
                                        <span style={{ marginRight: '60%' }}>ราคาทั้งหมด</span><span>{this.state.cost} บาท</span>
                                        <div><span style={{ marginRight: '67.5%' }}>ค่ามัดจำ</span><span>{this.state.cost / 2} บาท</span></div>
                                        <div style={{ color: 'coral', fontSize: '14px', marginTop: '5%' }}>*หมายเหตุ โอนเฉพาะค่ามัดจำก่อนเท่านั้น</div>
                                    </div>
                                </Card>
                            </Col>
                        </Row>


                    </Card>
                </div>
            </div>
        );
    }
}

export default Form.create()(FormInfo);