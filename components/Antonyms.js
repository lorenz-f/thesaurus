import React from "react";

export default function Antonyms({word}) {
    return (
        <>
            <a href = {`https://www.dictionary.com/browse/${word}`}>{word}</a>
        </>
    )
}