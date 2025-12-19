import Board from '../../asset/board.svg?react';
import Graph from '../../asset/graph.svg?react';

import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-sidebar min-h-screen bg-sidebar flex flex-col gap-12 items-center pt-10 shrink-0">
      <div className="cursor-pointer w-iconHover h-iconHover hover:bg-iconHover flex justify-center items-center rounded-hover">
        <Board onClick={() => navigate('/posts')} />
      </div>
      <div className="cursor-pointer w-iconHover h-iconHover hover:bg-iconHover flex justify-center items-center rounded-hover">
        <Graph onClick={() => navigate('/analytics')} />
      </div>
    </div>
  );
};

export default Sidebar;
