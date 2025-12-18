import type { Children } from '../../types';

const Background = ({ children }: Children) => {
  return <div className="w-screen h-screen bg-white flex">{children}</div>;
};

export default Background;
