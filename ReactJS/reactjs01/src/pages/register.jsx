import React from 'react';
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { createUserApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const RegisterPage = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const { name, email, password } = values;
        const res = await createUserApi(values);
        if (res) {
            notification.success({
                message: "CREATE USER",
                description: "success"
            });
            navigate("/login")
        } else {
            notification.error({
                message: "CREATE USER",
                description: "erorr"
            })
        }
    };
    return (
        <Row justify={"center"} style={{ marginTop: 30 }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin:"5px",
                    border: "1px solid #ccc",
                    boderRadius:"5px"
                }}>
                    <legend>Dang ky tai khoan</legend>
                    <Form
                    name='basic'
                    onFinish={onFinish}
                    autoComplete='off'
                    layout='vertical'
                    >
                        <Form.Item
                        label="Email"
                        name="email"
                        rules= {[
                            {
                                required: true,
                                message: 'Please input your email',
                            },
                        ]}>
                            <Input/>
                            </Form.Item>
                            <Form.Item
                            label="Password"
                            name="password"
                            rules = {[
                                {
                                    required:true,
                                    message: 'Please input your password',
                                },
                            ]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>

                    </Form>
                    <Link to ={"/"}><ArrowLeftOutlined /> Quay lại</Link>
                    <Divider />
                    <div style ={{textAlign: "center"}}>
                        <p>Bạn đã có tài khoản? <Link to={"/login"}>Đăng nhập</Link></p>
                    </div>
                </fieldset>

                </Col>
        </Row>
    )
}

export default RegisterPage;