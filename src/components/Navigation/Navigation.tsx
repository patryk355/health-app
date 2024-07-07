import {NavLink} from 'react-router-dom';

const Navigation = () => {
  return (
    <div id='navigation'>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='profile'>Profile</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
