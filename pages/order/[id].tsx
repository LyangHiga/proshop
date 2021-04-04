import { GetServerSideProps } from "next";

import Order from "../../models/Order";

interface OrderProps {
  order: Order;
  err: boolean;
}

const OrderPage = ({ order, err }: OrderProps) => {
  return <div>{order._id}</div>;
};

export default OrderPage;

// why should I keep a global state here?
// https://stackoverflow.com/questions/35328056/react-redux-should-all-component-states-be-kept-in-redux-store
export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { id } = params!;
  const { user } = req.cookies;
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { token } = JSON.parse(user);
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const data = await fetch(`http://localhost:5000/api/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const order = await data.json();

  return {
    props: {
      order,
      err: !data.ok,
    },
  };
};
