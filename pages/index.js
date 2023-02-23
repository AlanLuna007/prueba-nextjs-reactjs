import { useState, useEffect } from 'react';
import { Button, Spin, message, Modal, Space, Tag, Tooltip } from 'antd';
import { userService } from './../services/user.service';
import { useRouter } from 'next/router';
import { PieChartOutlined, LineChartOutlined, FacebookOutlined, LinkedinOutlined, FormOutlined, LogoutOutlined } from '@ant-design/icons';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [spin, setSpin] = useState(true);
  const [dataGoula, setdataGoula] = useState();
  const [dataCategories, setdataCategories] = useState();
  const [typeCategories, settypeCategories] = useState();
  const [dataJueces, setdataJueces] = useState();
  const [htmlGoula, setHtmlGoula] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const user = localStorage.getItem('userProject');
    if (!user) {
      router.push({
        pathname: '/login',
      });
    } else {
      setUser(user);
      setSpin(false);
    }
    userService.getGoula()
      .then((data) => {
        setdataGoula(data);
        setHtmlGoula(String(data.acf.descripcion));
      })
    userService.getCategories()
      .then((data) => {
        setdataCategories(data);
      })
    userService.getJueces()
      .then((data) => {
        setdataJueces(data);
      })
  }, []);

  const showModal = (element) => {
    settypeCategories(element);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('userProject');
    router.push({
      pathname: '/login',
    });
  }

  return (
    <div className="">
      {contextHolder}
      {spin ?
        <div className='w-100 d-flex justify-content-center align-items-center container-login'>
          <Spin size="large" /></div> :
        <div className="wrapper">
          <nav className='nav-home'><div></div><a onClick={logout}><Tooltip title="Cerrar sesión"><LogoutOutlined /></Tooltip></a></nav>
          <h1 className='h1-goula'>Goula</h1>

          <div className="flexbox">
            {dataGoula ? <div className="box">
              <h2>{dataGoula.acf.titulo}</h2>
              <div className="scrollbar" id="content-scroll">
                <div><PieChartOutlined className="third icon" /></div>
                <div className="third contents" dangerouslySetInnerHTML={{ __html: htmlGoula }} />
                <p className="third">{dataGoula.acf.bases.subtitulo}</p>
                <p className="third contents">{dataGoula.acf.bases.contenido}</p>
                <p className="third">{dataGoula.acf.fechas_importantes.subtitulo}</p>
                <div>{dataGoula.acf.fechas_importantes.fechas.map((element, index) => {
                  return (<p className="third span-fechas">{`${index + 1}. ${element.fecha}`}</p>)
                })}</div>
                <div className='w-100 d-flex justify-content-center align-items-center'><Button className="button-goula" type="link" href={dataGoula.link} target='_blink'>Convocatoria</Button></div>
              </div>
            </div> : null}
            {dataCategories ? <div className="box">
              <h2>{dataCategories.acf.titulo}</h2>
              <div className="scrollbar" id="content-scroll">
                <div><LineChartOutlined className="third icon" /></div>
                <p className="third contents">{dataCategories.acf.descripcion}</p>
                <p className="third">Categorias: </p>
                <div>{dataCategories.acf.categorias.map((element, index) => {
                  return (<div>
                    <Button type="link" className="button-categories" onClick={() => { showModal(element) }}>{`${index + 1}. ${element.titulo}`}</Button>
                  </div>)
                })}
                  {typeCategories ? <Modal title={typeCategories.titulo} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <div className='w-100 d-block justify-content-center align-items-center modal-container'>
                      <img src={typeCategories.imagen} className='img-categories' />
                      <p>{typeCategories.descripcion}</p>
                      <Button type="link" href={typeCategories.link} target='_blink'>ver más</Button>
                    </div>
                  </Modal> : null}
                  <Space className='space-tag' wrap>
                    <a href={dataCategories.acf.links_compartelo.link_facebook} target='_blink'>
                      <Tag icon={<FacebookOutlined />} color="#3b5999">
                        Facebook
                      </Tag>
                    </a>
                    <a href={dataCategories.acf.links_compartelo.link_instagram} target='_blink'>
                      <Tag icon={<LinkedinOutlined />} color="#55acee">
                        LinkedIn
                      </Tag>
                    </a>
                  </Space>
                </div>
              </div>
            </div> : null}
            {dataJueces ? <div className="box">
              <h2>{dataJueces.acf.titulo}</h2>
              <div className="scrollbar" id="content-scroll">
                <div><FormOutlined className="third icon" /></div>
                <p className="third contents">{dataJueces.acf.descripcion}</p>
                <p className="third">{dataJueces.acf.comparte_a_los_jueces.texto}</p>
                <Space className='space-tag' wrap>
                  <a href={dataJueces.acf.comparte_a_los_jueces.link_facebook} target='_blink'>
                    <Tag icon={<FacebookOutlined />} color="#3b5999">
                      Facebook
                    </Tag>
                  </a>
                  <a href={dataJueces.acf.comparte_a_los_jueces.link_instagram} target='_blink'>
                    <Tag icon={<LinkedinOutlined />} color="#55acee">
                      LinkedIn
                    </Tag>
                  </a>
                </Space>
              </div>
            </div> : null}
          </div>
        </div>
      }
    </div>
  )
}
