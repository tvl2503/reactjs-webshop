import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Helmet from '../components/Helmet';
import heroSilderData from '../assets/data/hero-silder';
import SwiperSlider from '../components/SwiperSlider';
import Section, { SectionTitle } from '../components/Section';
import Grid from '../components/Grid';
import ProductCard from '../components/ProductCard';
import { publicRequest } from '../services/requesMethods';
import policy from '../assets/data/policy';
import PolicyCard from '../components/PolicyCard';
import Loading from '../components/Loading';
const Home = () => {
  const [products, setProducts] = useState([]);
  const [productsCheap, setProductCheap] = useState([])
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products?page=1&sort=-1&key=createdAt")
        setProducts(res.data.productsList)
      }
      catch (err) {
      }
    }
    getProducts()
    const getProductCheap = async () => {
      try {
        const res = await publicRequest.get("/products?page=1&sort=1&key=price")
        setProductCheap(res.data.productsList)
      }
      catch (err) {
      }
    }
    getProductCheap()

  }, [])

  return (
    <Helmet title='Home'>

      <SwiperSlider data={heroSilderData} />
      <div className="container">
        <Section>
          <SectionTitle>Sản phẩm mới nhất</SectionTitle>
          {products && <Grid col={5} mdCol={3} smCol={1} gap={20}>
            {products.map((item, index) =>
              <ProductCard
                product={item}
                key={index}
                name={item.title}
                price={item.price}
                slug={item._id} img1={item.img1} img2={item.img2} />)}
          </Grid>}
          {products.length === 0 && <Loading />}
        </Section>
        <Section>
          <SectionTitle>Sản phẩm giá rẻ</SectionTitle>
          {<Grid col={5} mdCol={3} smCol={1} gap={20}>
            {productsCheap.map((item, index) =>
              <ProductCard
                product={item}
                key={index}
                name={item.title}
                price={item.price}
                slug={item._id} img1={item.img1} img2={item.img2} />)}
          </Grid>}
          {productsCheap.length === 0 && <Loading />}
        </Section>
        <Section>
          <Grid
            col={4} mdCol={2} smCol={1} gap={20}
          >
            {
              policy.map((item, index) => <Link key={index} to="/policy">
                <PolicyCard
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
              </Link>)
            }
          </Grid>
        </Section>
      </div>

    </Helmet>
  )
}

export default Home