import type { NextApiRequest, NextApiResponse } from "next";
import { slugToObject } from "../../../utils";
import { supabase } from "../../../supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slugObject = slugToObject(req.query.slug);
  try {
    const { data, error } = await supabase.storage
      .from("compiled-pages")
      .download(slugObject.path);
    if (error) {
      throw new Error(`${error.message}. Path: ${slugObject.path}`);
    }
    if (data === null) {
      res.status(404);
    } else {
      const text = await data?.text();
      res.status(200).json(JSON.parse(text));
    }
  } catch (catchedError) {
    throw catchedError;
  }
}
