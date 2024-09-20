import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  return (
    <div>
      id: {id}
      <br />
      This page is under maintenance
    </div>
  );
};

export default SingleProduct;
