import React from 'react'
import PropTypes from 'prop-types'
import "./button.scss"
const Button = props => {



    return (
        <button
            className={`btn `}
            onClick={props.onclick ?  props.onclick : null}
            disabled = {props.disabled}
        >
            <span className="btn__txt">{props.children}</span>
        </button>
    )
}

Button.propTypes = {
    backgroundColor: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    animate: PropTypes.bool,
    onclick: PropTypes.func
}

export default Button
