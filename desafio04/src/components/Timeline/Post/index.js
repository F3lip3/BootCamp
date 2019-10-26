import React from 'react';
import Comment from './Comment';
import profile from '../../../assets/profile-example-01.png';
import './post.css';

function Post() {
    return (
        <div className="post">
            <div className="title">
                <div className="profile" style={styles.profileImage}>
                    &nbsp;
                </div>
                <div className="content">
                    <div className="name">Júlio Alcântara</div>
                    <div className="time">26 Out 2019</div>
                </div>
            </div>
            <div className="content">
                Pessoal, alguém sabe se a Rocketseat está contratando?
            </div>
            <hr />
            <Comment />
        </div>
    );
}

const styles = {
    profileImage: {
        background: `url(${profile})`
    }
};

export default Post;
