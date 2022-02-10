import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { RedditAPI } from "../RedditAPI";
import styles from "../styles/Home.module.css";

const Home: NextPage<{ pages: any }> = ({ pages }) => {
  return (
    <ul>
      {pages.map((page: string) => (
        <li key={page}>{page}</li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const { data: pages } = await RedditAPI.fetchWikiPages();

  return {
    props: {
      pages,
    },
  };
}

export default Home;
