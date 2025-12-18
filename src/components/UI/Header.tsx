import type { Children } from '../../types';
import Titlebar from './Titlebar';

const Header = ({ children }: Children) => {
  return (
    <div className="flex items-center">
      <Titlebar />
      <h1>{children}</h1>
    </div>
  );
};

export default Header;
