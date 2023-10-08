import { useState } from 'react';
import styles from './SubmissionForm.module.scss';

interface KeywordsInputProps {
  defaultValue: string[];
  dataKey: string;
  updateFormData: (newArray: string[]) => void;
}

const KeywordsInput = ({ defaultValue, dataKey, updateFormData }: KeywordsInputProps) => {
  const [keywords, setKeywords] = useState(defaultValue);

  function handleKeyDown(e: React.KeyboardEvent) {
    // If user did not press enter key, return
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      e.preventDefault();
      // Get the value of the input
      const value = e.target.value
      // If the value is empty, return
      if (!value.trim()) return
      // Add the value to the tags array
      setKeywords([...keywords, value])
      updateFormData(keywords);
      // Clear the input
      e.target.value = ''
    }
  }

  function removeKeyword(index: number) {
    setKeywords(keywords.filter((element, i) => i !== index))
    updateFormData(keywords);
  }

  const keywordList = ["SCRUM", "Software Development Life Cycle (SDLC)", "Kanban", "Lean", "Agile Methodolgies", "Waterfall"];

  return (
    <div>
      {keywords.map((keyword, index) => (
        <div className={styles.KeywordItem} key={index}>
          <span className="text">{keyword}</span>
          <span className={styles.close} onClick={() => removeKeyword(index)}>&times;</span>
        </div>
      ))}
      <div>
        <input
        list="keywordList"
          type="text"
          className={styles.KeywordInput}
          placeholder="Enter a new keyword: "
          data-key={dataKey}
          onKeyDown={handleKeyDown}
        />
        <datalist id="keywordList" style={{display: 'block'}}>
          {keywordList.map(keyword => {
            return (
              <option value={keyword}/>
            );
          })}
        </datalist>
      </div>

    </div>
  )
}

export default KeywordsInput;