import Background from '../components/UI/Background';
import Header from '../components/UI/Header';
import Sidebar from '../components/UI/Sidebar';

const Posts = () => {
  return (
    <Background>
      <Sidebar />
      <main className="m-14">
        <Header>게시판</Header>
      </main>
    </Background>
  );
};

export default Posts;
