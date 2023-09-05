import React from "react";

export default function Synonyms({word}) {

    return (
        <>
            <a href = {`https://www.dictionary.com/browse/${word}`}>{word}</a>
        </>
    )
}