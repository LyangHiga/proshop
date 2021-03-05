// JUST TO TEST GetStaticProps and GetServerSideProps
import products from "../../../products";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  const product = products.find((p) => p._id === id);
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

  res.status(200).json({ product });
};
