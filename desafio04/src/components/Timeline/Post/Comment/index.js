import React from 'react';

import './comment.css';

function Comment({ data }) {
    return (
        <div className="comment">
            <div
                className="profile"
                style={{ background: `url(${data.author.avatar})` }}
            >
                &nbsp;
            </div>
            <div className="content">
                <strong>{data.author.name}</strong> {data.content}
            </div>
        </div>
    );
}

export default Comment;
