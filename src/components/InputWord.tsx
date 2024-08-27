import { useRef, useEffect } from "react";
import { wordsDictionary } from "../words-dictionary";

const InputWord = ({
  wordSet,
  onWordSubmit,
  currentWord,
  setCurrentWord,
}: {
  wordSet: Set<string>;
  onWordSubmit: Function;
  currentWord: string;
  setCurrentWord: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const wordListRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (event) => {
    setCurrentWord(event.target.value.toLowerCase());
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleWordSubmit(event);
    }
  };

  const handleWordSubmit = (event) => {
    event.preventDefault();
    if (currentWord.length < 3) return;

    const isWordInDictionary = wordsDictionary.has(currentWord);
    if (!isWordInDictionary) return;

    onWordSubmit(currentWord);
    setCurrentWord("");
  };

  const words = wordSet.values();
  useEffect(() => {
    if (wordListRef.current) {
      wordListRef.current.scrollTop = wordListRef.current.scrollHeight;
    }
  }, [words]);

  return (
    <div className="word-list-container">
      <div className="word-list" ref={wordListRef}>
        {Array.from(wordSet).map((word, index) => (
          <div key={`${word}-${index}`} className="word-item">
            {word}
          </div>
        ))}
      </div>
      <div className="input-word">
        <input
          type="text"
          value={currentWord}
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          placeholder="Enter a word"
        />
        <button className="button-primary" onClick={handleWordSubmit}>
          + Add Word
        </button>
      </div>
    </div>
  );
};

export default InputWord;
