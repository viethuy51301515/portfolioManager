import React from 'react';
import {Modal, Form, Icon, Input, Button, Checkbox,notification } from 'antd';
import './login.scss';
import {authLogin} from '../../firebase';
import {useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login} from '../../action/action';
const LoginForm = (props)=>{
    const dispatch = useDispatch();
    const { getFieldDecorator } = props.form;
    const [isLogged,setLogg] = useState(false);
    const data = useSelector(state => state.login);
    function handleSubmit(e){
        e.preventDefault();
        props.form.validateFields((err, values) => {
        console.log(data.email);
        authLogin.signInWithEmailAndPassword(values.username,values.password).then(function(res) {
            notification['success']({
                message:'Thành Công',
                description:'Bạn vừa đăng nhập thành công.'
            })
            dispatch(login(res.user.email));
            // props.setEmail(res.user.email);
            localStorage.setItem("email",res.user.email);
            setLogg(true);
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                notification['error']({
                    message:'Lỗi',
                    description:'Sai mật khẩu'
                })
            } else {
                notification['error']({
                    message:'Lỗi',
                    description:errorMessage
                })
            }
        })
        });
    }
    const render = ()=>{
        if(isLogged){
            console.log('1232131');
            window.location="/";
            // return(<Redirect to='/' />)
        }
        else{
            return(
                <Modal
                visible={true}
                footer=''
                title='Đăng nhập trước khi sử dụng'
                >
                <Form onSubmit={handleSubmit} className="login-form" className='loginForm'>
            <Form.Item>
            {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
            })(
                <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username" id='email'
                />,
            )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
            })(
                <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                id='password'
                placeholder="Password"
                />,
            )}
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
            </Button>
            </Form.Item>
        </Form>
        </Modal>
            )
        }
    }
    return(
        <div>
            
            {render()}
        </div>
    )

}
const Login = Form.create({ name: 'normal_login' })(LoginForm);
export default Login;