import Background from '../components/UI/Background';
import Sidebar from '../components/UI/Sidebar';
import Header from '../components/UI/Header';

const Analytics = () => {
  return (
    <Background>
      <Sidebar />
      <main className="m-14">
        <Header>데이터 시각화</Header>
      </main>
    </Background>
  );
};

export default Analytics;
