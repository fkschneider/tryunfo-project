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
    };
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      this.setState({ isSaveButtonDisabled: this.validateFields() });
    });

    //   if (cardAttr1 + cardAttr2 + cardAttr3 > 210) {
    //     this.setState({ isSaveButtonDisabled: true });
    //   }
    //   if (cardAttr1 || cardAttr2 || cardAttr3 > 90) {
    //     this.setState({ isSaveButtonDisabled: true });
    //   }
    //   if (cardAttr1 || cardAttr2 || cardAttr3 < 0) {
    //     this.setState({ isSaveButtonDisabled: true });
    //   }
    // };

    validateFields = () => {
      const {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
      // cardRare,
      } = this.state;

      const validName = cardName.length > 0;
      const validDescription = cardDescription.length > 0;
      const validImage = cardImage.length > 0;
      const individualMax = 90;
      const validAttr1 = Number(cardAttr1) <= individualMax;
      const validAttr2 = Number(cardAttr2) <= individualMax;
      const validAttr3 = Number(cardAttr3) <= individualMax;
      const validAttribute = validAttr1 && validAttr2 && validAttr3;
      const sum = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
      const totalNumber = 210;
      const validNumber = sum <= totalNumber;
      const nameDescImage = validName && validDescription && validImage;
      const allFields = nameDescImage && validAttribute && validNumber;
      return !allFields;
    };

    render();
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
  };
}

export default App;
