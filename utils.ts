export function slugToObject(slug: string[] | string) {
  let newSlug;
  if (!Array.isArray(newSlug) && typeof slug === "string") {
    newSlug = Array.from(slug.split("/"));
  } else {
    newSlug = Array.from(slug);
  }
  const [filename, ...restOfPath] = newSlug.reverse();
  const slugWithOutFilename = restOfPath.reverse();
  const parentPath = slugWithOutFilename.join("/");
  return {
    filename,
    parentPath,
    path: `${parentPath}/${filename}.json`,
  };
}
