import React, { useState } from "react"
import PropTypes from 'prop-types';


const CustomAccordion = ({ title, content }) => {
    const [accordionStatus, setAccordionStatus] = useState(false);

    const onClicked = () => {
        setAccordionStatus(!accordionStatus);
    }

    return (
        <div className={`accordion ${accordionStatus ? "uncollapsed" : 'collapsed'}`}>
            <button onClick={onClicked}>
                {title}
                <span class="arrow"></span>
            </button>
            <div className="accordion-panel">
                {content}
            </div>
        </div>
    )
}

export default CustomAccordion

CustomAccordion.propTypes = {
    title: PropTypes.object,
    content: PropTypes.object
};