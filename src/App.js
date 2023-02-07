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
      isSaveButtonDisabled: true,
      // savedCards: [],
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      this.setState({ isSaveButtonDisabled: this.validateFields() });
    });
  };

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

  // saveButton = (event) => {
  //   const { name, value } = event.target;
  // };

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
      isSaveButtonDisabled,
    } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          onInputChange={ this.onInputChange }
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
      </div>
    );
  }
}

export default App;
