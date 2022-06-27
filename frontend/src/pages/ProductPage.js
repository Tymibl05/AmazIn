import { useParams } from 'react-router-dom';

export const ProductPage = () => {
  const { slug } = useParams();
  return <h1>{slug}</h1>;
};
