import React, { Component } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Post from './Post';
import './timeline.css';

class Timeline extends Component {
    state = {
        newPost: '',
        currentUser: {
            name: 'Felipe H. Teixeira',
            avatar: '/profiles/felipe-teixeira.jpeg'
        },
        posts: [
            {
                id: 1,
                author: {
                    name: 'Julio Alcantara',
                    avatar: '/profiles/julio-alcantara.png'
                },
                date: '04 jun 2019',
                content:
                    'Pessoal, alguém sabe se a Rocketseat está contratando?',
                comments: [
                    {
                        id: 1,
                        author: {
                            name: 'Diego Fernandes',
                            avatar: '/profiles/diego-fernandes.png'
                        },
                        content: `A Rocketseat está sempre em busca de novos \
                        membros para o time, e geralmente ficamos de olho em quem \
                        se destaca no Bootcamp, inclusive 80% do nosso time de devs \
                        é composto por alunos do Bootcamp. Além disso, se você tem \
                        vontade de ensinar gravando vídeos e criando posts, \
                        pode me chamar no Discord! \
                        (Sério, me chamem mesmo, esse comentário é real)`
                    }
                ]
            }
        ]
    };

    handlePostChange = e => {
        this.setState({ newPost: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const lastPost = this.state.posts.slice(-1);
        const nextId = lastPost ? lastPost[0].id + 1 : 1;
        this.setState({
            posts: [
                {
                    id: nextId,
                    author: {
                        name: this.state.currentUser.name,
                        avatar: this.state.currentUser.avatar
                    },
                    date: format(new Date(), 'dd MMM yyyy', { locale: ptBR }),
                    content: this.state.newPost.replace(/\n/g, '<br>')
                },
                ...this.state.posts
            ]
        });
        this.setState({ newPost: '' });
    };

    render() {
        return (
            <div className="timeline">
                <form onSubmit={this.handleSubmit} className="new-post">
                    <textarea
                        placeholder="Nova mensagem..."
                        onChange={this.handlePostChange}
                        value={this.state.newPost}
                    ></textarea>
                    {this.state.newPost && (
                        <button type="submit">Enviar</button>
                    )}
                </form>
                {this.state.posts.map(post => (
                    <Post key={post.id} data={post} />
                ))}
            </div>
        );
    }
}

export default Timeline;
