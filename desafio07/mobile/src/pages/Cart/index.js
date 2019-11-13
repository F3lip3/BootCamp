import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';
import colors from '../../styles/colors';

import {
  Container,
  Wrapper,
  Products,
  Product,
  ProductInfo,
  ProductImage,
  ProductDetails,
  ProductTitle,
  ProductPrice,
  ProductDelete,
  ProductControls,
  ProductControlButton,
  ProductAmount,
  ProductSubTotal,
  TotalContainer,
  TotalText,
  TotalAmount,
  Order,
  OrderText,
  EmptyContainer,
  EmptyText,
  EmptyContainerButton,
  EmptyContainerButtonText
} from './styles';

function Cart({
  navigation,
  products,
  total,
  removeFromCart,
  updateAmountRequest
}) {
  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  return (
    <Container>
      {products.length ? (
        <Wrapper>
          <Products>
            {products.map(product => (
              <Product key={product.id}>
                <ProductInfo>
                  <ProductImage source={{ uri: product.image }} />
                  <ProductDetails>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductPrice>{product.priceFormatted}</ProductPrice>
                  </ProductDetails>
                  <ProductDelete onPress={() => removeFromCart(product.id)}>
                    <Icon
                      name="delete-forever"
                      size={24}
                      color={colors.primary}
                    />
                  </ProductDelete>
                </ProductInfo>
                <ProductControls>
                  <ProductControlButton onPress={() => decrement(product)}>
                    <Icon
                      name="remove-circle-outline"
                      size={20}
                      color={colors.primary}
                    />
                  </ProductControlButton>
                  <ProductAmount value={String(product.amount)} />
                  <ProductControlButton onPress={() => increment(product)}>
                    <Icon
                      name="add-circle-outline"
                      size={20}
                      color={colors.primary}
                    />
                  </ProductControlButton>
                  <ProductSubTotal>{product.subtotal}</ProductSubTotal>
                </ProductControls>
              </Product>
            ))}
          </Products>
          <TotalContainer>
            <TotalText>TOTAL</TotalText>
            <TotalAmount>{total}</TotalAmount>
            <Order>
              <OrderText>FINALIZAR PEDIDO</OrderText>
            </Order>
          </TotalContainer>
        </Wrapper>
      ) : (
        <EmptyContainer>
          <Icon name="remove-shopping-cart" size={64} color="#eee" />
          <EmptyText>Seu carrinho está vazio.</EmptyText>
          <EmptyContainerButton onPress={() => navigation.navigate('Home')}>
            <EmptyContainerButtonText>VOLTAR</EmptyContainerButtonText>
          </EmptyContainerButton>
        </EmptyContainer>
      )}
    </Container>
  );
}

Cart.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      title: PropTypes.string,
      priceFormatted: PropTypes.string
    })
  ).isRequired,
  total: PropTypes.string.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateAmountRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
    priceFormatted: formatPrice(product.price)
  })),
  total: formatPrice(
    state.cart.reduce(
      (total, product) => total + product.price * product.amount,
      0
    )
  )
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
