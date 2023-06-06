import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const location = useLocation(); // localização atual da rota
  const [showSearch, setShowSearch] = useState(false);
  console.log(location);

  // alternar a exibição da barra de busca
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  // renderizar a barra de busca
  const renderSearchBar = () => {
    if (showSearch) {
      return (
        <input
          type="text"
          placeholder="Search..."
          data-testid="search-input"
        />
      );
    }
    return null;
  };

  // renderiza o ícone de pesquisa
  const renderSearchButton = () => {
    // páginas em que o ícone de pesquisa será exibido
    const searchPages = ['/meals', '/drinks'];

    if (searchPages.includes(location.pathname)) {
      return (
        <button
          data-testid="search-top-btn"
          onClick={ toggleSearch }
          src={ searchIcon }
        >
          <img src={ searchIcon } alt="Pesquisar" />
        </button>
      );
    }
    return null;
  };

  // Função para obter o título da página com base na rota atual
  const getPageTitle = () => {
    switch (location.pathname) {
    case '/':
      return '';
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return 'Recipe Details';
    }
  };

  return (
    <header>
      <div>
        {/* Renderiza o ícone de perfil como um link */}
        <Link to="/profile" data-testid="profile-top-btn" src={ profileIcon }>
          <img src={ profileIcon } alt="Perfil" />
        </Link>
        {/* ícone de pesquis */}
        {renderSearchButton()}
      </div>
      {/* ítulo da página dependendo da rota atual */}
      <h1 data-testid="page-title">{getPageTitle()}</h1>
      {/* barra de busca */}
      {renderSearchBar()}
    </header>
  );
}

export default Header;
