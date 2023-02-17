import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
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
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
      handleSubmit,
    } = this.props;

    return (
      <div>
        <form
        onSubmit={handleSubmit}
        >
          <label htmlFor="cardName">
            Nome
            <input
              type="text"
              data-testid="name-input"
              name="cardName"
              value={cardName}
              onChange={onInputChange}
            />
          </label>
          <label htmlFor="description">
            Descrição
            <textarea
              id="description"
              data-testid="description-input"
              name="cardDescription"
              value={cardDescription}
              onChange={onInputChange}
            />
          </label>
          <label htmlFor="attr1">
            Atributo 1
            <input
              id="attr1"
              type="number"
              data-testid="attr1-input"
              name="cardAttr1"
              value={cardAttr1}
              onChange={onInputChange}
            />
          </label>
          <label htmlFor="attr2">
            Atributo 2
            <input
              id="attr2"
              type="number"
              data-testid="attr2-input"
              name="cardAttr2"
              value={cardAttr2}
              onChange={onInputChange}
            />
          </label>
          <label htmlFor="attr3">
            Atributo 3
            <input
              id="attr3"
              type="number"
              data-testid="attr3-input"
              name="cardAttr3"
              value={cardAttr3}
              onChange={onInputChange}
            />
          </label>
          <label htmlFor="image">
            Imagem
            <input
              id="image"
              type="text"
              data-testid="image-input"
              name="cardImage"
              value={cardImage}
              onChange={onInputChange}
            />
          </label>
          <label htmlFor="rarity">
            Raridade
            <select
              id="rarity"
              data-testid="rare-input"
              name="cardRare"
              value={cardRare}
              onChange={onInputChange}
            >
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito raro</option>
            </select>
          </label>
          { hasTrunfo ? 'Você já tem um Super Trunfo em seu baralho' :
         <label htmlFor="checkbox">
              Super Trybe Trunfo
              <input
                id="checkbox"
                type="checkbox"
                data-testid="trunfo-input"
                name="cardTrunfo"
                checked={cardTrunfo}
                onChange={onInputChange} />
            </label>}
            <button
              type="button"
              data-testid="save-button"
              name="isSaveButtonDisabled"
              disabled={isSaveButtonDisabled}
              onClick={onSaveButtonClick}
            >
                Salvar

              </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
};

export default Form;
