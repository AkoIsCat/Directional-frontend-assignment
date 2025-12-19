import type { Children } from '../../types';

const Background = ({ children }: Children) => {
  return (
    <div className="w-screen bg-white flex overflow-x-hidden">{children}</div>
  );
};

export default Background;
