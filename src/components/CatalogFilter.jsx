import React, {useState} from 'react'
import PropTypes from 'prop-types'

const CatalogFilter = props => {
    const data = props.data
    const [name, setName] = useState('')
    const [toggleFilter, setToggleFilter] = useState(false)
    return (
        <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title" onClick={() => setToggleFilter(!toggleFilter)}>
                <p>{name === '' ? props.name : name}</p>
                <i class={`fal fa-angle-down ${toggleFilter ? 'action' : ''}`} ></i>
            </div>
            <div className={`catalog__filter__widget__content ${toggleFilter ? 'action' : ''}`}>
                <div className="catalog__filter__widget__content__item" onClick={() => {
                        setToggleFilter(false)
                        setName(props.name)}}>
                    {props.name}
                </div>
                {data.map((item, index) => (
                    <div key={index} 
                    className="catalog__filter__widget__content__item"
                    onClick={() => {
                        setToggleFilter(false)
                        setName(item.display)}}>
                        {item.display}
                    </div>
                ))}
            </div>
        </div>
    )
}

CatalogFilter.propTypes = {}

export default CatalogFilter