import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";
import { slugToObject } from "../../../utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slugObject = slugToObject(req.query.slug);
  try {
    const basePath = process.cwd();
    const file = await fs.readFile(
      path.join(
        basePath,
        "../../",
        `${process.env.NODE_ENV === "development" ? "compiledpages" : ""}/${
          slugObject.path
        }`
      )
    );
    res.status(200).json(JSON.parse(file.toString()));
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
}
