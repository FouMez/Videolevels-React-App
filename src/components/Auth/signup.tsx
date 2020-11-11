import { LockOutlined, MailOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, } from 'antd';
import * as React from 'react'
import { useDispatch } from 'react-redux'
import FORM_VALIDATORS from '../../helpers/formValidators';
import { signUpAsync } from '../../redux/auth/action';
import { UserCredentials } from '../../redux/auth/types';
import './styles.scss';

interface Props {
    onLogin: () => void
}

const SignupForm: React.FC<Props> = ({ onLogin }) => {


    // const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();


    const onFinish = (values: UserCredentials) => {
        dispatch(signUpAsync(values))
    };

    return (
        <Card className="login-card" title={<div> <UserAddOutlined className="left-icon" /> Sign up </div>}>
            <Form
                name="signup-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="name"
                    rules={[FORM_VALIDATORS.required]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[FORM_VALIDATORS.required, { type: "email", message: "Please provide a valid email address." }]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[FORM_VALIDATORS.required, FORM_VALIDATORS.passwordMinLength]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="passwordConfirm"
                    rules={[FORM_VALIDATORS.required, FORM_VALIDATORS.passwordMatch]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Confirm password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit" style={{ marginTop: 5 }}>
                        Sign up
            </Button>
                </Form.Item>
                Already a user?<Button type="link" onClick={onLogin}>log in!</Button>
            </Form>
        </Card >
    );
};




export default SignupForm;