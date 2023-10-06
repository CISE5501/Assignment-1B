import { useState } from 'react';
import styles from './KeywordsInput.module.scss';

interface KeywordsInputProps {
  defaultValue: string[];
  dataKey: string;
}

const KeywordsInput = ({ defaultValue, dataKey }: KeywordsInputProps) => {
  const [keywords, setKeywords] = useState(defaultValue);

  function handleKeyDown(e: any) {
    // If user did not press enter key, return
    if (e.key !== 'Enter') return
    // Get the value of the input
    const value = e.target.value
    // If the value is empty, return
    if (!value.trim()) return
    // Add the value to the tags array
    setKeywords([...keywords, value])
    // Clear the input
    e.target.value = ''
  }

  function removeKeyword(index: number) {
    setKeywords(keywords.filter((element, i) => i !== index))
  }

  return (
    <div>
      {keywords.map((keyword, index) => (
        <div className={styles.keywordItem} key={index}>
          <span className="text">{keyword}</span>
          <span className={styles.close} onClick={() => removeKeyword(index)}>&times;</span>
        </div>
      ))}
      <div>
        <input
          type="text"
          className='keywords-input'
          placeholder="Type something"
          data-key={dataKey}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}

export default KeywordsInput;