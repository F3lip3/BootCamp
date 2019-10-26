import React from 'react';

import profile from '../../../../assets/profile-example-02.jpeg';
import './comment.css';

function Comment() {
    return (
        <div className="comment">
            <div className="profile" style={styles.profileImage}>
                &nbsp;
            </div>
            <div className="content">
                <strong>Felipe H. Teixeira</strong> A Rocketseat está sempre em
                busca de novos membros para o time, e geralmente ficamos de olho
                em quem se destaca no Bootcamp, inclusive 80% do nosso time de
                devs é composto por alunos do Bootcamp. Além disso, se você tem
                vontade de ensinar gravando vídeos e criando posts, pode me
                chamar no Discord! (Sério, me chamem mesmo, esse comentário é
                real)
            </div>
        </div>
    );
}

const styles = {
    profileImage: {
        background: `url(${profile})`
    }
};

export default Comment;
