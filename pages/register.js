import moment from 'moment/moment';
import { userService } from './../services/user.service';
import { useRouter } from 'next/router';
import {
    AutoComplete,
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    Card,
    message
} from 'antd';
import { useState } from 'react';

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export default function Home() {

    const router = useRouter();
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        let data = {};
        data = values;
        data.numero_de_empleados = 'Microempresa';
        data.fecha_origen = moment(values.fecha_origen.$d).format('DD/MM/YYYY');
        data.nivel_de_ventas = {
            anio_1: values.anio_1,
            anio_2: values.anio_2,
            anio_3: values.anio_3
        }
        delete data['anio_1'];
        delete data['anio_2'];
        delete data['anio_3'];

        userService.register(data)
            .then((res) => {
                if (res.status == 200) {
                    messageApi.open({
                        type: 'success',
                        content: 'Usuario registrado correctamente!',
                        duration: 2,
                    }).then(() => {
                        router.push({
                            pathname: '/login',
                        });
                    })
                }
            })
            .catch((error) => {
            });
    };

    const onWebsiteChange = (value) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net', '.mx'].map((domain) => `${value}${domain}`));
        }
    };
    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));

    const login = () => {
        router.push({
            pathname: '/login',
        });
    }

    return (
        <div className='w-100 d-flex justify-content-center container-register'>
            {contextHolder}
            <Card title={<div><h3>Crear cuenta</h3>
                <p>¿Ya tienes una cuenta? <Button type="link" onClick={login}>Inicia sesión</Button></p>
            </div>} bordered={false} style={{ width: 'auto', margin: '20px', paddingTop: '10px' }}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    labelCol={{ flex: '190px' }}
                    onFinish={onFinish}
                    initialValues={{
                        residence: ['zhejiang', 'hangzhou', 'xihu'],
                        prefix: '86',
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    className='form-register'
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
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
                        name="nombres"
                        label="Nombre(s)"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Nombre(s)!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="apellidos"
                        label="apellidos"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Apellidos!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'La contraseña  debe tener  al menos una minúscula, una mayúscula,  un número y una longitud de 8 caracteres.',
                                maxLength: 8,
                                validator: async (rule, value) => {
                                    const securePasswordRegEx = /^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])\S{8}$/
                                    if (securePasswordRegEx.test(value)) {
                                        return true;
                                    } else {
                                        throw new Error('Something wrong!');
                                    }
                                }
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password maxLength={8} />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label={`Confirmar\n Password`}
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'La contraseña  debe tener  al menos una minúscula, una mayúscula,  un número y una longitud de 8 caracteres.',
                                maxLength: 8,
                                validator: async (rule, value) => {
                                    const securePasswordRegEx = /^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])\S{8}$/
                                    if (securePasswordRegEx.test(value)) {
                                        return true;
                                    } else {
                                        throw new Error('Something wrong!');
                                    }
                                }
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('¡Las dos contraseñas que ingresó no coinciden!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password maxLength={8} />
                    </Form.Item>

                    <Form.Item
                        name="telefono"
                        label="Telefono"
                        rules={[
                            {
                                required: true,
                                message: 'El numero de telefono debe tener 10 dígitos.',
                                validator: async (rule, value) => {
                                    if (value.length == 10) {
                                        return true;
                                    } else {
                                        throw new Error('Something wrong!');
                                    }
                                }
                            },
                        ]}
                    >
                        <Input
                            maxLength={10}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="celular"
                        label="Celular"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Celular!',
                                validator: async (rule, value) => {
                                    if (value.length == 10) {
                                        return true;
                                    } else {
                                        throw new Error('Something wrong!');
                                    }
                                }
                            },
                        ]}
                    >
                        <Input
                            maxLength={10}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="forma_enterado"
                        label="forma enterado"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su forma enterado',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="otro_forma_enterado"
                        label="otro forma enterado"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su otro forma enterado',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="cargo"
                        label="Cargo"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Cargo',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="nombre_empresa"
                        label="Nombre empresa"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Nombre empresa',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="fecha_origen"
                        label="fecha origen"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su fecha origen',
                                whitespace: true,
                                validator: async (rule, value, date, dateString) => {
                                    if (value) {
                                        return true;
                                    } else {
                                        throw new Error('Something wrong!');
                                    }
                                }
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        name="hombres"
                        label="hombres"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su el numero de hombres',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="mujeres"
                        label="Mujeres"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su el numero de mujeres',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="no_binario"
                        label="No binario"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su el numero de No binarios',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="geografia_intervencion"
                        label="geografia intervencion"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Geografia intervencion',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="razon_social"
                        label="razon social"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Razon social',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="url_empresa"
                        label="url empresa"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Url empresa!',
                            },
                        ]}
                    >
                        <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
                            <Input />
                        </AutoComplete>
                    </Form.Item>

                    <Form.Item
                        name="cp"
                        label="CP"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su CP!',
                                validator: async (rule, value) => {
                                    if (value.length == 5) {
                                        return true;
                                    } else {
                                        throw new Error('Something wrong!');
                                    }
                                }
                            },
                        ]}
                    >
                        <Input
                            maxLength={5}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="calle_numero"
                        label="calle_numero"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Calle numero!',
                            },
                        ]}
                    >
                        <Input
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="colonia"
                        label="Colonia"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Colonia',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="delegacion_municipio"
                        label="delegacion municipio"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Delegacion Municipio',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="ciudad"
                        label="Ciudad"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Ciudad',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="pais"
                        label="Pais"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Pais',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="vision"
                        label="Vision"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Vision',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="mision"
                        label="Mision"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Mision',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="clientes"
                        label="Clientes"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Clientes',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="usuarios"
                        label="Usuarios"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Usuarios',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="aliados"
                        label="Aliados"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Aliados',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="grupos_de_interes"
                        label="Grupos de interes"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Grupos de interes',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="competencia"
                        label="Competencia"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Competencia',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="participado_en_programas_de_aceleracion"
                        label="¿Programas de aceleracion?"
                        rules={[
                            {
                                required: true,
                                message: 'Please select',
                            },
                        ]}
                    >
                        <Select placeholder="si o no">
                            <Option value="si">Si</Option>
                            <Option value="no">No</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="cual_programa"
                        label="Cual programa"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Cual programa',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <span>Nivel de ventas: </span>
                    <Form.Item
                        name="anio_1"
                        label="año 1"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Nivel de ventas',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="anio_2"
                        label="año 2"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Nivel de ventas',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="anio_3"
                        label="año 3"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su Nivel de ventas',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}