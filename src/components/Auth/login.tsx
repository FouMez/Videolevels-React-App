import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input, } from 'antd';
import * as React from 'react'
import { useDispatch } from 'react-redux';
import FORM_VALIDATORS from '../../helpers/formValidators';
import { loginAsync } from '../../redux/auth/action';
import { UserCredentials } from '../../redux/auth/types';
import './styles.scss';


interface Props {
    onSignup: () => void
}

const LoginForm: React.FC<Props> = ({ onSignup }) => {
    const dispatch = useDispatch();

    const onFinish = (values: UserCredentials) => {
       dispatch(loginAsync(values));
    };

    return (
        <Card className="login-card" title={<div> <LoginOutlined className="left-icon" /> Sign in </div>}>
            <Form
                name="login-form"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[FORM_VALIDATORS.required, { type: "email", message: "Please provide a valid email address." }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[FORM_VALIDATORS.required]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit" style={{ marginTop: 5 }}>
                        Log in
            </Button>
                </Form.Item>
        Don't have an account? <Button onClick={onSignup} type="link">register now!</Button>
            </Form>
        </Card>
    );
};


export default LoginForm;