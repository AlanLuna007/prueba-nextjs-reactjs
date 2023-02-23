import { useState, useEffect } from 'react';
import { Button, Form, Input, Card, Alert, message } from 'antd';
import { useRouter } from 'next/router';
import { userService } from './../services/user.service';

export default function Login() {
    const [alert, setAlert] = useState(false);
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = (values) => {
        userService.login(values)
            .then((res) => {
                if (res.status == 403) {
                    setAlert(true);
                }
                if (res.status == 200) {
                    localStorage.setItem('userProject', values.username)
                    messageApi.open({
                        type: 'success',
                        content: 'Bienvenido!',
                        duration: 2,
                    }).then(() => {
                        router.push({
                            pathname: '/',
                        });
                    })
                }
            })
            .catch((error) => {
            });
    };
    const onFinishFailed = (errorInfo) => {
    };

    const register = () => {
        router.push({
            pathname: '/register',
        });
    }

    return (
        <>
            {contextHolder}
            <div className='w-100 d-flex justify-content-center align-items-center container-login'>
                <Card title="Inicia sesión" bordered={false} style={{ width: 'auto' }}>
                    {alert ? <Alert message="Dirección de correo electrónico desconocida. Verifique de nuevo o intente utilizar su nombre de usuario." type="error" showIcon style={{ marginBottom: '15px' }} /> : null}
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Por favor ingrese su E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingrese su password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <div>
                        <p>¿No tienes cuenta? <Button type="link" onClick={register}>Crear cuenta</Button></p>
                    </div>
                </Card>
            </div>
        </>
    )
}