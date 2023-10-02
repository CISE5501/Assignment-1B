import React from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import NavBar from './nav/NavBar';
import NavDropdown from './nav/NavDropdown';
import NavItem from './nav/NavItem';

const PopulatedNavBar = () => {
  return (
    <NavBar>
      <NavItem>SPEED</NavItem>
      <NavItem route="/" end>
        Home
      </NavItem>
      <NavItem route="/moderator">Moderator</NavItem>
      <NavItem route="/analyst"> Analyst </NavItem>
      <NavItem dropdown route="/"> Articles <IoMdArrowDropdown/>
        <NavDropdown>
          <NavItem route="/articles">See all Articles</NavItem>
          <NavItem route="articles/addArticle">Submit an Article</NavItem>
        </NavDropdown>
      </NavItem>
    </NavBar>
  );
};

export default PopulatedNavBar;
