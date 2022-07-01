import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Button from '../components/Button'
import Grid from '../components/Grid'
import Helmet from '../components/Helmet'
import Input from '../components/Input'

const srcMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.3050672217873!2d105.78563351485356!3d20.980404986024595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accdd8a1ad71%3A0xa2f9b16036648187!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IGNow61uaCB2aeG7hW4gdGjDtG5n!5e0!3m2!1svi!2s!4v1649775640660!5m2!1svi!2s"
const contactInfo = [
  {
    title: 'Địa chỉ',
    des: 'Km 10, Mỗ Lao, Hà Đông, Hà Nội',
    icon: 'fal fa-map'
  },
  {
    title: 'Địa chỉ Email',
    des: 'volinhh1804@gmail.com',
    icon: 'fal fa-envelope-open'
  },
  {
    title: 'Điện thoại',
    des: '0392280138',
    icon: 'fal fa-mobile'
  },
]
const Contact = () => {
  return (
    <Helmet title='Liên hệ' >
      <Breadcrumb title = {'Liên hệ chúng tôi'} />
      <div className="contact container">
        <div className="contact__info">
        <Grid col={3} mdCol ={2} smCol = {1} gap={40}>
            {
              contactInfo.map((item, index) => (
                <div key={index} className="contact__info__item">
                  <div className="contact__info__item__icon">
                    <i className={item.icon}></i>
                  </div>
                  <div className="contact__info__item__title">
                    {item.title}
                  </div>
                  <div className="contact__info__item__des">
                    {item.des}
                  </div>
                </div>
              ))
            }
        </Grid>
        </div>
        <div className="contact__bottom">

        <Grid col={2} mdCol={1} gap ={40}>
            <div className="contact__getInTouch">
              <div className="contact__getInTouch__title">
                Liên Lạc
              </div> 
              <div className="contact__getInTouch__form">
                  <Grid col={2} smCol={1} gap ={20}>
                    <Input type="text" placeholder={"Enter Name"} />
                    <Input type="text" placeholder={"Enter Email"} />
                  </Grid>
                  <Grid col={2} smCol={1} gap ={20}>
                    <Input type="text" placeholder={"Enter Phone number"} />
                    <Input type="text" placeholder={"Enter Subject"} />
                  </Grid>
                  <Input type="text" placeholder={"Message"} />
                  <Button>Gửi</Button>
              </div>
            </div>
            <div className="contact__map">
            <iframe src={srcMap}  allowfullscreen="" width={"600px;"} height ={"400px;"} loading="lazy"  referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

        </Grid>
        </div>

      </div>
    </Helmet  >
  )
}

export default Contact