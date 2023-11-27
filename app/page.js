"use client";
import Image from "next/image";
import AddNovel from "./components/AddNovel";
import { gql, useQuery } from "@apollo/client";

export const GET_DATA = gql`
  query GetNovels {
    novels {
      id
      title
      image
      authors {
        name
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_DATA);
  return (
    <div>
      <AddNovel />
      <p className="text-lg font-bold">All Novels</p>
      {data &&
        data.novels.map((novel, key) => {
          return (
            <div key={key}>
              <p>Novel title: {novel.title}</p>
              <p>
                Novel authors:{" "}
                {novel.authors.map((author, key) => (
                  <span key={key}>{author.name}, </span>
                ))}
              </p>
              <Image src={novel.image} alt="image" width={80} height={80} />
              <br />
            </div>
          );
        })}
    </div>
  );
}
