import React, { useState } from 'react';
import { Article } from "../src/schema/article";
import styles from './SubmissionForm.module.css';

type Props = { 
  saveArticle: (e: React.FormEvent, formData: Article | unknown) => void;
}

const ArticleSubmissionForm: React.FC<Props> = ({ saveArticle }) => {
  const [formData, setFormData] = useState<Article | object>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  }

  return (
    <form className={styles.Form} onSubmit={(e) => saveArticle(e, formData)}>
      <div className={styles.FormContent}>
        <div className={styles.LeftColumn}>
          <label> Article Title:
            <input className={styles.Input} onChange={handleForm} type="text" id="title" />
          </label>
          <br/>
          <label> Author:
            <input className={styles.Input} onChange={handleForm} type="text" id="author" />
            <button type="button">+</button>
          </label>
          <br/>
          <label> Keywords:
            <input className={styles.Input} onChange={handleForm} type="text" id="keywords" />
          </label>
          <br/>
          <label> Abstract:
           <input className={styles.Input} onChange={handleForm} type="text" id="abstract" />
          </label>
        </div>
        <div className={styles.RightColumn}>
          <label> Journal:
            <input className={styles.Input} onChange={handleForm} type="text" id="journal" />
          </label>
          <br/>
          <div className={styles.RightColumnRow}>
          <label> Date:
            <input className={styles.Input} onChange={handleForm} type="date" id="date" />
          </label>
          <br/>
          <label> DOI:
            <input className={styles.Input} onChange={handleForm} type="text" id="doi" />
          </label>
          <br/>
          </div>
          <div className={styles.RightColumnRow}>
          <label> Volume:
            <input className={styles.Input} onChange={handleForm} type="number" id="volume" />
          </label>
          <br/>
          <label> Issue:
            <input className={styles.Input} onChange={handleForm} type="number" id="issue" />
          </label>
          <br/>
          </div>
          <div className={styles.RightColumnRow}>
          <label> Page Range 1:
            <input className={styles.Input} onChange={handleForm} type="number" id="rangeone" />
          </label>
          <label> Page Range 2:
            <input className={styles.Input} onChange={handleForm} type="number" id="rangetwo" />
          </label>
          </div>
        </div>
      </div>
          <button disabled={formData === undefined ? true : false} type="submit">Submit</button>
    </form>
  )
}

export default ArticleSubmissionForm
