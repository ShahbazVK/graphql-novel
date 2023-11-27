"use client";
import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { GET_DATA } from "../page";

const ADD_NOVEL = gql`
  mutation AddNovel($title: String, $image: String, $authors: [AuthorInput]) {
    addNovel(title: $title, image: $image, authors: $authors) {
      id
      title
      image
      authors {
        name
      }
    }
  }
`;

const AddNovel = () => {
  const [createNovel, { data, loading, error }] = useMutation(ADD_NOVEL, {
    refetchQueries: [GET_DATA],
  });
  const [Novel, setNovel] = useState({
    authors: [],
    title: "",
    image: "",
  });
  const [currentAuthor, setcurrentAuthor] = useState("");
  const addAuthor = (e) => {
    if (e.target.value[e.target.value.length - 1] !== ",") {
      setcurrentAuthor(e.target.value);
    } else {
      setNovel((prev) => ({
        ...prev,
        authors: [...prev.authors, { name: currentAuthor }],
      }));
      setcurrentAuthor("");
    }
  };
  return (
    <div>
      Title:{" "}
      <input
        onChange={(e) =>
          setNovel((prev) => ({ ...prev, title: e.target.value }))
        }
        className="border border-black"
        value={Novel.title}
        type="text"
      />
      Image:{" "}
      <input
        onChange={(e) =>
          setNovel((prev) => ({ ...prev, image: e.target.value }))
        }
        className="border border-black"
        value={Novel.image}
        type="text"
      />
      Authors:{" "}
      <input
        onChange={addAuthor}
        className="border border-black"
        value={currentAuthor}
        type="text"
      />
      <button
        onClick={() => {
          setNovel((prev) => ({
            ...prev,
            authors: [...prev.authors, { name: currentAuthor }],
          }));
          createNovel({ variables: { ...Novel } });
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default AddNovel;
