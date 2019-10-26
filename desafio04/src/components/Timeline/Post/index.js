import React from 'react';
import Comment from './Comment';

import './post.css';

function Post({ data }) {
    return (
        <div className="post">
            <div className="title">
                <div
                    className="profile"
                    style={{ background: `url(${data.author.avatar})` }}
                >
                    &nbsp;
                </div>
                <div className="content">
                    <div className="name">{data.author.name}</div>
                    <div className="time">{data.date}</div>
                </div>
            </div>
            <div
                className="content"
                dangerouslySetInnerHTML={{ __html: data.content }}
            ></div>
            {data.comments && data.comments.length > 0 && (
                <>
                    <hr />
                    {data.comments.map(comment => (
                        <Comment key={comment.id} data={comment} />
                    ))}
                </>
            )}
        </div>
    );
}

export default Post;
