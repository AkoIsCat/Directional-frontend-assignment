import dayjs from '../../lib/dayjs';

const formatKST = (iso: string) => {
  return dayjs(iso).tz('Asia/Seoul').format('YY/MM/DD HH:mm');
};

export default formatKST;
