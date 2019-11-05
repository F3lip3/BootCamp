import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductsList } from './styles';

export default function Home() {
  return (
    <ProductsList>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-olympikus-attitude-576/88/D22-3009-088/D22-3009-088_detalhe2.jpg?ims=326x"
          alt="Tênis"
        />
        <strong>Tênis muito legal</strong>
        <span>R$ 129,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-olympikus-attitude-576/88/D22-3009-088/D22-3009-088_detalhe2.jpg?ims=326x"
          alt="Tênis"
        />
        <strong>Tênis muito legal</strong>
        <span>R$ 129,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-olympikus-attitude-576/88/D22-3009-088/D22-3009-088_detalhe2.jpg?ims=326x"
          alt="Tênis"
        />
        <strong>Tênis muito legal</strong>
        <span>R$ 129,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-olympikus-attitude-576/88/D22-3009-088/D22-3009-088_detalhe2.jpg?ims=326x"
          alt="Tênis"
        />
        <strong>Tênis muito legal</strong>
        <span>R$ 129,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-olympikus-attitude-576/88/D22-3009-088/D22-3009-088_detalhe2.jpg?ims=326x"
          alt="Tênis"
        />
        <strong>Tênis muito legal</strong>
        <span>R$ 129,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-olympikus-attitude-576/88/D22-3009-088/D22-3009-088_detalhe2.jpg?ims=326x"
          alt="Tênis"
        />
        <strong>Tênis muito legal</strong>
        <span>R$ 129,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
    </ProductsList>
  );
}
