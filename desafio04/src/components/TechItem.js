import React from 'react';
import PropTypes from 'prop-types';

function TechItem({ tech, onDelete }) {
    return (
        <li>
            {tech}&nbsp;
            <button type="button" onClick={onDelete}>
                Remover
            </button>
        </li>
    );
}

TechItem.defaultProps = {
    tech: 'Default'
};

TechItem.propTypes = {
    tech: PropTypes.string,
    onDelete: PropTypes.func.isRequired
};

export default TechItem;
