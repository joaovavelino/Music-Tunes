import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      buttonDisable: true,
      loading: false,
      apiStatus: false,
      lastedInput: '',
    };
    this.handeChange = this.handeChange.bind(this);
    this.verifyButton = this.verifyButton.bind(this);
    this.clearInputValue = this.clearInputValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeApiStatus = this.changeApiStatus.bind(this);
  }

  async handleClick() {
    const { inputValue } = this.state;
    this.setState(({ loading: true }));
    const answer = await searchAlbumsAPI(inputValue);

    this.setState((
      { loading: false, apiResult: answer }), this.clearInputValue);
    if (answer[0] !== undefined) {
      this.changeApiStatus();
    }
  }

  handeChange({ target }) {
    this.setState((
      { [target.name]: target.value }), this.verifyButton);
  }

  changeApiStatus() {
    this.setState({ apiStatus: true });
  }

  verifyButton() {
    const { inputValue } = this.state;
    let answer = true;
    if (inputValue.length >= 2) {
      answer = false;
    }
    this.setState({ buttonDisable: answer });
  }

  clearInputValue() {
    const { inputValue } = this.state;
    this.setState({ lastedInput: inputValue, inputValue: '' });
  }

  render() {
    const { inputValue, buttonDisable, loading,
      apiResult, apiStatus, lastedInput } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <section>
          <label htmlFor="search-artist-input">
            <input
              type="text"
              data-testid="search-artist-input"
              placeholder="Digite sua pesquisa"
              name="inputValue"
              onChange={ this.handeChange }
              value={ inputValue }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ buttonDisable }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </section>
        {loading && <Carregando />}
        {apiStatus && <p>{`Resultado de álbuns de: ${lastedInput}`}</p>}
        {apiStatus ? apiResult
          .map((card, index) => <AlbumCard data={ card } key={ index } />)
          : <div>Nenhum álbum foi encontrado</div>}
      </div>
    );
  }
}

export default Search;
