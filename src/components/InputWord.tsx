import { useState } from "react";
import { wordsDictionary } from "../words-dictionary";

const InputWord = ({
  wordSet,
  onWordChange,
}: {
  wordSet: Set<string>;
  onWordChange: Function;
}) => {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [isValidWord, setIsValidWord] = useState<Boolean>(true);

  const handleInputChange = (event) => {
    const isWord = wordsDictionary.has(event.target.value);
    setCurrentWord(event.target.value);
    setIsValidWord(isWord);
  };

  const handleWordSubmit = (event) => {
    event.preventDefault();
    if (currentWord !== "" && isValidWord) {
      onWordChange(currentWord);
      setCurrentWord("");
      setIsValidWord(true);
    }
  };
  return (
    <div className="word-list-container">
      <div className="word-list">
        {Array.from(wordSet).map((word, index) => (
          <div key={index} className="word-item">
            {word}
          </div>
        ))}
      </div>
      <div className="input-word">
        <input
          type="text"
          value={currentWord}
          onChange={handleInputChange}
          placeholder="Enter a word"
        />
        <button onClick={handleWordSubmit}>Add Word</button>
      </div>
    </div>
  );
};

export default InputWord;
