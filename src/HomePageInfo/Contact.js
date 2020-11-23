import React from 'react';
import { Form} from 'antd';
import '../css/contact.css'
class Contact extends React.Component {
    render() {
        return (
            <div>
                <section class="contact-section bg-black">
                    <div class="container">

                        <div class="row">

                            <div class="col-md-4 mb-3 mb-md-0">
                                <div class="card py-4 h-100">
                                    <div class="card-body text-center">
                                        <i class="fas fa-map-marked-alt text-primary mb-2"></i>
                                        <h4 class="text-uppercase m-0" style={{fontFamily:'Poppins, sans-serif', fontSize:'15px'}}>Address</h4>
                                        <hr class="my-4" />
                                        <div class="small text-black-50" style={{fontFamily:'Poppins, sans-serif' , fontSize:'15px'}}>444 Phuket ,Thailand</div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 mb-3 mb-md-0">
                                <div class="card py-4 h-100">
                                    <div class="card-body text-center">
                                        <h4 class="text-uppercase m-0" style={{fontFamily:'Poppins, sans-serif', fontSize:'15px'}}>Line ID</h4>
                                        <hr class="my-4" />
                                        <div class="small text-black-50">
                                            <a href="#" style={{fontFamily:'Poppins, sans-serif' , fontSize:'15px'}}>wongnokresident</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 mb-3 mb-md-0">
                                <div class="card py-4 h-100">
                                    <div class="card-body text-center">
                                        <i class="fas fa-mobile-alt text-primary mb-2"></i>
                                        <h4 class="text-uppercase m-0" style={{fontFamily:'Poppins, sans-serif', fontSize:'15px'}}>Tell</h4>
                                        <hr class="my-4" />
                                        <div class="small text-black-50" style={{fontFamily:'Poppins, sans-serif' , fontSize:'15px'}}>02-900-0000</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Form.create()(Contact);