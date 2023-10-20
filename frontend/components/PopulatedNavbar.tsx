import NavBar from './nav/NavBar';
import NavItem from './nav/NavItem';
import SearchDisplay from './search/SearchDisplay';

const PopulatedNavBar = () => {
  return (
    <NavBar>
      <NavItem>SPEED</NavItem>
      <SearchDisplay size={20} dropdown={false} />
      <NavItem route="/" end>
        Home
      </NavItem>
      <NavItem route="/moderator">Moderator</NavItem>
      <NavItem route="/analyst">Analyst</NavItem>
      <NavItem route="/articles">All Articles</NavItem>
      <NavItem route="/articles/addArticle">New Article</NavItem>
    </NavBar>
  );
};

export default PopulatedNavBar;
