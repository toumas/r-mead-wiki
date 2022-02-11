import { GetStaticPropsContext, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { RedditAPI } from "../RedditAPI";

const Page: NextPage<{ content: any }> = ({ content }) => {
  console.log(content);
  return <div dangerouslySetInnerHTML={{ __html: content?.content_html }} />;
};

interface Params extends ParsedUrlQuery {
  title: string;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { title } = context.params as Params;

  const { data: content } = await RedditAPI.fetchPage(title);

  return {
    props: {
      content,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { title: "index" } }],
    fallback: true, // false or 'blocking'
  };
}

export default Page;
