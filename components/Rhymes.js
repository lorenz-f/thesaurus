import React from "react";

export default function Rhymes({word}) {
    return (
        <>
            <a href = {`https://www.dictionary.com/browse/${word}`}>{word}</a>
        </>
    )
}