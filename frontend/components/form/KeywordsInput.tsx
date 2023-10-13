import { useState } from 'react';
import { Form, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SubmissionForm.module.scss';

//props
interface KeywordsInputProps {
  defaultValue: string[];
  dataKey: string;
  updateFormData: (newArray: string[]) => void;
}

const KeywordsInput = ({ defaultValue, dataKey, updateFormData }: KeywordsInputProps) => {
  //sets initial value of keywords to the default value
  const [keywords, setKeywords] = useState<string[]>(defaultValue);

  //handle user pressing enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // If user did not press enter key, return
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      e.preventDefault();
      // Get the value of the input
      const value = e.target.value;
      // If the value is empty, return
      if (!value.trim()) return;
      // Add the value to the tags array
      const temp = keywords.concat(value);
      setKeywords(temp);
      updateFormData(temp);
      // Clear the input
      e.target.value = '';
    }
  };
  //removes keywords
  const removeKeyword = (index: number) => {
    const temp = keywords.filter((element, i) => i !== index);
    setKeywords(temp);
    updateFormData(temp);
  };

  //keyword
  const keywordList = [
    'SCRUM',
    'Software Development Life Cycle (SDLC)',
    'Kanban',
    'Lean',
    'Agile Methodolgies',
    'Waterfall',
  ];

  return (
    <Form.Group as={Col} controlId={dataKey} data-key={dataKey}>
      <Form.Label>Keywords</Form.Label>
      <br />
      {keywords.map((keyword, index) => (
        <div className={styles.keywordItem} key={index}>
          <span className="text">{keyword}</span>
          <span className={styles.close} onClick={() => removeKeyword(index)}>
            &times;
          </span>
        </div>
      ))}
      <Form.Control
        list="keywordList"
        type="text"
        placeholder="Enter a new keyword: "
        data-key={dataKey}
        onKeyDown={handleKeyDown}
      />
      <datalist id="keywordList" style={{ display: 'block' }}>
        {keywordList.map((keyword) => {
          return <option key={keyword} value={keyword} hidden />;
        })}
      </datalist>
    </Form.Group>
  );
};

export default KeywordsInput;
