import React, { Component } from 'react';
import "antd/dist/antd.css";
import { storage } from '../firebase';
import firebase from '../firebase'
import axios from 'axios';
import { Form, Input, Button, Select, Upload, Icon, message, DatePicker, TimePicker } from 'antd';
import moment from 'moment';
const { Option } = Select;
// const db = firebase.firestore();
let fileCount = 0;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

function disabledDate(current) {
    // Can not select days before today and today
    if (!current) {
        // allow empty select
        return false;
      } const date = moment();
      date.hour(0);
      date.minute(0);
      date.second(0)
    if (current.valueOf() < date.valueOf()){
        return true ;
    }
      
}

class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            name: "",
            phoneNum: "",
            datePayment: "",
            timePayment: "",
            price: "",
            url: null,
            loading: false,
            progress: 0,
            status: "รอการตรวจสอบ",
            statusUpload: '',
            id: '',
            phoneCheck: '',
            page1: '',
            page2: 'none',
            name: '',
            price: 0,
            dateCheckIn: '',
            dateCheckOut: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = e => {
        e.preventDefault();
        
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { image } = this.state;
                console.log("image", image);
                if (this.state.image == null) {
                    message.error("กรุณาอัพโหลดสลิป")
                } else {
                    const uploadTask = storage.ref(`images/${image.name}`).put(image);
                    uploadTask.on('state_changed',
                        async (snapshot) => {
                            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            console.log("progress", progress);
                            if (progress !== 100) {
                                this.setState({ statusUpload: 'กรุณารอการอัพโหลดรูป' })
                            }
                        },
                        (error) => {
                            console.log('error', error);
                        },
                        () => {
                            // complete function ....
                            storage.ref('images').child(image.name).getDownloadURL().then(url2 => {
                                console.log("url", url2);
                                this.setState({ statusUpload: '' })
                                this.setState({ url: url2 });
                                const name = this.state.name;
                                const phoneNum = this.state.phoneCheck;
                                const datePayment = values['date-picker'].format('DD-MM-YYYY');
                                const timePayment = values['time-picker'].format('HH:mm');
                                const price = this.state.price;
                                const { url, status } = this.state
                                const dateCheckin = this.state.dateCheckIn
                                const dateCheckOut = this.state.dateCheckOut

                                axios.get(`/findBookingInfoByPhone/${phoneNum}`).then(resp => {
                                    const id = resp.data.id
                                    axios.post('/addReceiptInfo', ({ id, name, phoneNum, datePayment, dateCheckin,dateCheckOut, timePayment, price, url, status })).then(resp => {
                                        console.log(resp);
                                    })
                                    axios.put(`/updateStatusRecById/${resp.data.id}`, ({ status }))
                                    axios.put(`/updateStatusBookingById/${resp.data.id}`, ({ status }))
                                    message
                                        .loading('ระบบกำลังบันทึกข้อมูล', 1)
                                        .then(() => message.success('กำลังบันทึกข้อมูล', 1))

                                    setTimeout(function () {
                                        window.location.href = "/FinishPayment"
                                    }, 2000);
                                })
                            })
                        });
                }
            }
        });

    };
    handleChange = e => {
        console.log(e)
        if (e.fileList[fileCount].type == 'image/jpeg' || e.fileList[fileCount].type == 'image/png') {
            console.log("fileType : ", e.fileList[fileCount].type)
            const image = e.fileList[fileCount].originFileObj;
            this.setState(() => ({ image }));
            if (e.file.status === 'uploading') {
                this.setState({ loading: true });
                return;
            }
            if (e.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(e.file.originFileObj, imageUrl =>
                    this.setState({
                        imageUrl,
                        loading: false,
                    }),
                );
            }
        }
        fileCount++
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

    handleBookingIdCheckOnChange = event => {
        this.setState({ id: event.target.value }, () => {
            this.validateBookingId();
        });
    }

    handleSearch = e => {
        e.preventDefault();
        const id = this.state.id
        const phoneNum = this.state.phoneCheck
        if (this.state.phoneCheck.length == 10 && this.state.id.length == 4) {
            axios.get(`/findBookingInfoByPhoneAndId/${phoneNum}/${id}`, ({ id, phoneNum })).then(resp => {
                if (resp.data.id != null) {
                    this.setState({
                        page1: 'none',
                        page2: '',
                        name: resp.data.name,
                        price: resp.data.cost / 2,
                        dateCheckIn: resp.data.dateCheckIn,
                        dateCheckOut: resp.data.dateCheckOut
                    })
                } else {
                    message.error("ไม่มีข้อมูลการจองของท่าน")
                }
            })
        } else {
            message.error("กรุณากรอกข้อมูลให้ถูกต้องครบถ้วน")
        }
    }

    validateBookingId = () => {
        const { id } = this.state;
        this.setState({
            idError:
                id.length == 4 ? null : 'รหัสการจองไม่ถูกต้อง'
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 9 },
            wrapperCol: { span: 13 },
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <div>
                        <div style={{ display: this.state.page1 }}>
                            <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: '6%' }}>กรอกเพื่อค้นหาข้อมูลการจอง</div>
                            <input
                                type='number'
                                name='phoneNum'
                                className={`form-control ${this.state.phoneError ? 'is-invalid' : ''}`}
                                id='phoneNum'
                                placeholder='Enter Phone Number'
                                value={this.state.phoneCheck}
                                onChange={this.handlePhoneCheckOnChange}
                                onBlur={this.validatePhoneNum}
                                style={{ width: '10cm', marginLeft: '10%' }}
                                onKeyDown={(evt) => (evt.key === 'e' || evt.key === '.' || evt.key === '-') && evt.preventDefault()}
                            />
                            <input
                                type='bookingId'
                                name='bookingId'
                                className={`form-control ${this.state.idError ? 'is-invalid' : ''}`}
                                id='bookingId'
                                placeholder='Enter Booking Id'
                                value={this.state.id}
                                onChange={this.handleBookingIdCheckOnChange}
                                onBlur={this.validateBookingId}
                                style={{ width: '10cm', marginLeft: '10%', marginTop: '3%' }}
                                onKeyDown={(evt) => (evt.key === 'e' || evt.key === '.' || evt.key === '-') && evt.preventDefault()}
                            />
                            <div className='invalid-feedback' >{this.state.emailError}</div>
                            <Button style={{ marginTop: '3%', marginLeft: '40%', fontFamily: "Kanit, sans-serif" }} type="primary" onClick={(e) => this.handleSearch(e)} >ค้นหา</Button>

                        </div>
                        <div style={{ display: this.state.page2 }}>
                        <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: '6%' }}>อัพโหลดข้อมูลและสลิปการโอนค่ามัดจำ</div>
                            <div style={{marginLeft: '5%', fontSize: '16px'}}>
                                <div> ชื่อผู้จอง : {this.state.name} </div>
                                <div> หมายเลขโทรศัพท์ : {this.state.phoneCheck} </div>
                                <div> รหัสการจอง : {this.state.id} </div>
                                <div> เงินมัดจำที่ต้องโอน : {this.state.price}</div>
                                <div> วันที่เช็คอิน : {this.state.dateCheckIn}</div>
                                <div> วันที่เช็คเอาท์ : {this.state.dateCheckOut}</div>
                            </div>
                            <div style={{marginTop: '3%'}} >
                            <Form.Item label="วันที่โอน" style={{marginTop: '3%'}}>
                                {getFieldDecorator('date-picker', {
                                    rules: [{ required: true, message: 'กรุณาเลือกวันที่โอนเงิน' }]
                                })(<DatePicker disabledDate={disabledDate}/>)}
                            </Form.Item>
                            <Form.Item label="เวลาที่โอนมัดจำ">
                                {getFieldDecorator('time-picker', {
                                    rules: [{ required: true, message: 'กรุณาเลือกเวลาที่โอน' }]
                                })(<TimePicker format={"HH:mm"} />)}
                            </Form.Item>

                            <div style={{ textAlign: 'center', color: 'black' }}>อัพโหลดหลักฐานการชำระเงิน</div>
                            <div style={{ marginLeft: '36%' }}>
                                <Upload
                                    name="avatar"
                                    // type="file"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </div>
                            <div style={{ color: 'red', marginLeft: '32%' }}>{this.state.statusUpload}</div>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ marginLeft: '68%', fontFamily: "Kanit, sans-serif" }}>
                                    ยืนยันข้อมูล
                        </Button>
                            </Form.Item>
                            </div>
                        </div>
                    </div>
                </Form>


            </div>
        )
    }
}
export default Form.create()(Confirm);