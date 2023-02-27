import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      savedCards: [],
    };
  }

  // func que captura os inputs nos campos do form
  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      this.setState({ isSaveButtonDisabled: this.validateFields() });
    });
  };

  // validações do botão de Salvar
  validateFields = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
    } = this.state;

    const validName = cardName.length > 0;
    const validDescription = cardDescription.length > 0;
    const validImage = cardImage.length > 0;
    const maxAttribute = 90;
    const validAttr1 = Number(cardAttr1) <= maxAttribute;
    const validAttr2 = Number(cardAttr2) <= maxAttribute;
    const validAttr3 = Number(cardAttr3) <= maxAttribute;
    const validAttribute = validAttr1 && validAttr2 && validAttr3;
    const zeroAttr1 = Number(cardAttr1) >= 0;
    const zeroAttr2 = Number(cardAttr2) >= 0;
    const zeroAttr3 = Number(cardAttr3) >= 0;
    const zeroAttr = zeroAttr1 && zeroAttr2 && zeroAttr3;
    const sum = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
    const maxNumber = 210;
    const validNumber = sum <= maxNumber;
    const nameDescImg = validName && validDescription && validImage;
    const numbers = validAttribute && validNumber && zeroAttr;
    const allFields = nameDescImg && numbers;
    return !allFields;
  };

  // limpa os campos após clicar no botão
  clearFields = () => {
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });
  };

  // salva os inputs em objetos
  handleSubmit = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      savedCards,
    } = this.state;

    const cardObject = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    // coloca os objetos/cards em um array
    this.setState({
      savedCards: [...savedCards, cardObject],
    });
  };

  // func chamada ao clicar o botão Salvar
  onSaveButtonClick = () => {
    this.clearFields();
    this.handleSubmit();
    this.trunfoCard();
  };

  // avalia se já há carta com super trunfo
  trunfoCard = () => {
    const {
      savedCards,
      cardTrunfo,
    } = this.state;

    savedCards.forEach((card) => {
      if (card.cardTrunfo === true) {
        this.setState({ hasTrunfo: true });
      }
    });
    if (savedCards.length === 0 && cardTrunfo === true) {
      this.setState({ hasTrunfo: true });
    }
  };

  // botão de excluir
  deleteCard = ({ target }) => {
    const { name } = target;
    const {
      savedCards,
    } = this.state;

    const cardsLeft = savedCards.filter((element) => element.cardName !== name);
    this.setState({ savedCards: cardsLeft });

    cardsLeft.some((trunfo) => trunfo.hasTrunfo === true);
    this.setState({ hasTrunfo: false });
  };

  // filtra a carta pelo nome
  filterByName = ({ target }) => {
    const { savedCards } = this.state;
    const { value } = target;
    // console.log(value);
    const chosenCard = savedCards.filter((card) => card.cardName.includes(value));
    this.setState({ savedCards: chosenCard });
  };

  // filtra a carta pela raridade
  filterByRarity = ({ target }) => {
    const { savedCards } = this.state;
    const { value } = target;
    console.log(value);

    const cardsByRarity = savedCards.filter((card) => card.cardRare === value);
    this.setState({ savedCards: cardsByRarity });

    if (value === 'todas') {
      this.setState({ savedCards });
    }
  };

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      savedCards,
      isSaveButtonDisabled,
    } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
          clearFields={ this.clearFields }
          trunfoCard={ this.trunfoCard }
          deleteCard={ this.deleteCard }
          filterByName={ this.filterByName }
          filterByRarity={ this.filterByRarity }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <ul>
          {savedCards.map((item, index) => (
            <li key={ index }>
              <Card
                cardName={ item.cardName }
                cardDescription={ item.cardDescription }
                cardAttr1={ item.cardAttr1 }
                cardAttr2={ item.cardAttr2 }
                cardAttr3={ item.cardAttr3 }
                cardImage={ item.cardImage }
                cardRare={ item.cardRare }
                cardTrunfo={ item.cardTrunfo }
              />
              <button
                type="button"
                data-testid="delete-button"
                name={ item.cardName }
                onClick={ this.deleteCard }
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
