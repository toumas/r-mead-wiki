import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";
import { slugToObject } from "../../utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slugObject = slugToObject(req.query.slug);
  const file = await fs.readFile(
    path.join(
      process.cwd(),
      `${process.env.NODE_ENV === "development" ? "/public" : ""}/_pages/${
        slugObject.path
      }`
    )
  );
  res.status(200).json(JSON.parse(file.toString()));
}
