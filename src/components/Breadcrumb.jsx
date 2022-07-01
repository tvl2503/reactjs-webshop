import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Breadcrumb = props => {
    return (
        <div className="breadcrumb-section">
            <div className=" container ">
                <div className="breadcrumb__title">
                    <h1>{props.title}</h1>
                </div>
                <div className="breadcrumb">
                    <div className="breadcrumb--item">
                        <Link to="/">Trang Chủ</Link>
                    </div>
                    <div className="breadcrumb--item active">
                        <span> {'>'} </span>
                        <span>{props.title}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

Breadcrumb.propTypes = {
    title : PropTypes.string.isRequired
}

export default Breadcrumb