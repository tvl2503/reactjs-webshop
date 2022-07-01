import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Grid from '../components/Grid'
import Helmet from '../components/Helmet'
import {info, expertise} from '../assets/data/infomation'
const img = "https://res.cloudinary.com/fef/image/upload/v1651675236/105590484_701163134057757_8693776072813985805_n_sdttjc.jpg"

const About = () => {
  return (
    <Helmet title = "Giới thiệu">
      <Breadcrumb title = {'Giới thiệu'} />
      <div className="about-us">
        <Grid col={2} smCol = {1}>
          <div className="about-us__img">
            <img src = {img} />
          </div>
          <div className="about-us__content">
            <div className="about-us__content__title">Hi, i'm Linh</div>
            <p className='text'>Bạn cần sức mạnh, nghị lực nên cuộc sống đã đặt ra những khó khăn nghịch cảnh để bạn vượt qua và trở nên mạnh mẽ hơn.</p>
             <p className='text'> Hãy cảm ơn những lúc bạn gặp khó khăn, bởi nếu không có khó khăn, bạn sẽ không có cơ hội để hiểu mình và trải nghiệm cuộc sống.</p>
            <ul className="information">

              {info.map((item, index)=> (
              <li key={index}>
                <span className='information__icon'>
                  <i className={item.icon}></i>
                </span>
                <p>{item.title}</p>
                <span class="saprater">:</span>
                <p>{item.des}</p>

              </li>
            ))}
            </ul>
            <div className="expertise">
                    <h3>Kỹ năng</h3>
                    <Grid col={4} mdCol = {3} smCol={2} gap = {30} >
                      {expertise.map((item, index) => (
                         <div key={index} className='item'>
                            <span className="expertise-logo">
                                <i className={item.icon}></i>
                            </span>
                            <p>{item.text}</p>
                        </div>
                      ))}
                 </Grid>
                </div>
          </div>
        </Grid>
      </div>
    </Helmet>
  )
}

export default About