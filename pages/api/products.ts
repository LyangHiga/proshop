// JUST TO TEST GetStaticProps
import products from "../../products";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

  res.status(200).json({ products });
};
