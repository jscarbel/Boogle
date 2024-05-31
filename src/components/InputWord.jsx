import { useState } from "react";
import BoardContainer from "./BoardContainer";
import { wordsDictionary } from "../words_dictionary";

const InputWord = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [wordSet, setWordSet] = useState(new Set());

  const handleInputChange = (event) => {
    const isWord = wordsDictionary.has(event.target.value);
    console.log("isWord = ", isWord);
    setCurrentWord(event.target.value);
  };

  const handleWordSubmit = (event) => {
    event.preventDefault();
    if (currentWord !== "") {
      setWordSet((prevSet) => new Set(prevSet.add(currentWord)));
      setCurrentWord("");
    }
  };
  return (
    <div className="input-word">
      <input
        type="text"
        value={currentWord}
        onChange={handleInputChange}
        placeholder="Enter a word"
      />
      <button onClick={handleWordSubmit}>Add Word</button>
      <ul>
        {Array.from(wordSet).map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
};

export default InputWord;
