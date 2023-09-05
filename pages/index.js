import React, { useState, useEffect } from "react";
import Image from "next/image";
import Synonyms from "../components/Synonyms";
import Rhymes from "../components/Rhymes";
import Antonyms from "../components/Antonyms";

export default function Home() {
  const [synonymsVisible, setSynonymsVisible] = useState(false);
  const [rhymesVisible, setRhymesVisible] = useState(false);
  const [antonymsVisible, setAntonymsVisible] = useState(false);

  const [synonymsData, setSynonymsData] = useState(null);
  const [rhymesData, setRhymesData] = useState(null);
  const [antonymsData, setAntonymsData] = useState(null);

  const [awaitingQuery, setAwaitingQuery] = useState(true); // controls initial screen prior to loading in the "word" area
  const [query, setQuery] = useState(""); // set null to comply with submit conditional
  const [submit, setSubmit] = useState(false);

  const { DateTime } = require("luxon");
  const currentTime = DateTime.now();

  useEffect(() => {
    // datamuse API fetch: https://www.datamuse.com/api/
    async function wordCall() {
      const synonymRes = await fetch(
        `https://api.datamuse.com/words?ml=${query}`
      );
      const rhymeRes = await fetch(
        `https://api.datamuse.com/words?rel_rhy=${query}`
      );
      const antonymRes = await fetch(
        `https://api.datamuse.com/words?rel_ant=${query}`
      );

      const synonymData = await synonymRes.json();
      const rhymeData = await rhymeRes.json();
      const antonymData = await antonymRes.json();

      // controls styling based on call status
      awaitingQuery
        ? (setSynonymsVisible(false),
          setRhymesVisible(false),
          setAntonymsVisible(false))
        : (setSynonymsVisible(true),
          setRhymesVisible(true),
          setAntonymsVisible(true));
      setSynonymsData(synonymData);
      setRhymesData(rhymeData);
      setAntonymsData(antonymData);
      setAwaitingQuery(false);
      setSubmit(false);
    }
    wordCall();
  }, [submit]);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (query) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }

  return (
    <>
      <Image
        className="absolute mt-6 ml-6 transition-all ease-in-out sm:hidden"
        src={
          currentTime.hour >= 21 || currentTime.hour < 6
            ? "/night.png"
            : currentTime.hour >= 6 && currentTime.hour <= 12
            ? "/sunrise.png"
            : currentTime.hour > 12 && currentTime.hour < 18
            ? "/afternoon.png"
            : "/sunset.png"
        }
        alt={
          currentTime.hour >= 21 || currentTime.hour < 6
            ? "night icon"
            : currentTime.hour >= 6 && currentTime.hour <= 12
            ? "morning icon"
            : currentTime.hour > 12 && currentTime.hour < 18
            ? "afternoon icon"
            : "evening icon"
        }
        width={50}
        height={50}
      />

      <div className="absolute text-4xl top-6 right-6 transition-all sm:hidden">
        {currentTime.hour +
          ":" +
          `${
            currentTime.minute < 10
              ? "0" + currentTime.minute.toString()
              : currentTime.minute
          }`}
      </div>
 
      <div className="h-[35vh]">
        <h1 className="text-gray-300 flex flex-row text-9xl items-center justify-center mx-3 transition-all sm:text-7xl">
          Thesaurus
        </h1>

        <div className="flex flex-row justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-row text-2xl items-center bg-gray-700 hover:bg-gray-600 transition-all rounded-full ease-out w-1/3 mb-2 mt-14 sm:w-[95vw]"
          >
            <button type="submit">
              <img src={`search.png`} className="mx-4 h-8 fill-gray-300 w-8" />
            </button>

            <input
              type="text"
              placeholder="Enter term..."
              value={query}
              onChange={handleChange}
              className="my-auto w-full h-12 bg-transparent rounded-full"
            ></input>
          </form>
        </div>

        <div
          className={`
            ${awaitingQuery} ? "text-gray-400" : "text-gray-300"
          } flex flex-row items-center justify-center text-center mt-4`}
        >
          Includes...
        </div>
        <div className="flex flex-row h-12 w-full">
          <div className="text-4xl h-10 w-full flex flex-row justify-center items-cyenter text-gray-600">
            <div className="w-1/5 items-center justify-center flex sm:w-1/3 sm:text-2xl">
              <button
                type="button"
                onClick={() => setSynonymsVisible(!synonymsVisible)}
                className={`word-type ${
                  synonymsVisible ? "word-type-visible" : "word-type-hidden"
                } sm:border-none`}
              >
                Synonyms
              </button>
            </div>
            <div className="w-1/5 items-center justify-center flex sm:w-1/3 sm:text-2xl">
              <button
                type="button"
                onClick={() => setAntonymsVisible(!antonymsVisible)}
                className={`word-type ${
                  antonymsVisible ? "word-type-visible" : "word-type-hidden"
                } sm:border-none`}
              >
                Antonyms
              </button>
            </div>
            <div className="w-1/5 items-center justify-center flex sm:w-1/3 sm:text-2xl">
              <button
                type="button"
                onClick={() => setRhymesVisible(!rhymesVisible)}
                className={`word-type ${
                  rhymesVisible ? "word-type-visible" : "word-type-hidden"
                } sm:border-none`}
              >
                Rhymes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* returned query columns */}

      {!synonymsData || synonymsData.length === 0 ? (
        <h1 className="loader items-center text-3xl text-center mt-40 transition-all">
          Awaiting search term...
        </h1>
      ) : (
        <main className="flex flex-row w-full h-screen items-center justify-center text-center mx-auto text-4xl mt-4 sm:mt-0 tracking-normal sm:text-xl">
          <div
            className={`word-list ${
              synonymsVisible ? "word-list-visible" : "word-list-hidden"
            } sm:w-1/3`}
          >
            {synonymsData.map((synonym, i) => {
              return <Synonyms key={synonym[i]} {...synonym} />;
            })}
          </div>
          <div
            className={`word-list ${
              antonymsVisible ? "word-list-visible" : "word-list-hidden"
            } sm:w-1/3`}
          >
            {antonymsData.map((antonym, i) => {
              return <Antonyms key={antonym[i]} {...antonym} />;
            })}
          </div>
          <div
            className={`word-list ${
              rhymesVisible ? "word-list-visible" : "word-list-hidden"
            } sm:w-1/3`}
          >
            {rhymesData.map((rhyme, i) => {
              return <Rhymes key={rhyme[i]} {...rhyme} />;
            })}
          </div>
        </main>
      )}
    </>
  );
}
