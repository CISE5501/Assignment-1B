import React, { useState, FormEvent} from 'react';
import { Article } from "../src/schema/article";
import styles from './SubmissionForm.module.css';

type Props = { 
  saveArticle: (e: React.FormEvent, formData: Article | unknown) => void;
}

const ArticleSubmissionForm: React.FC<Props> = ({ saveArticle }) => {
  const [formData, setFormData] = useState<Article>( {
    title: '',
    authors: [],
    date: '',
    journal: '',
    volume: 0,
    issue: 0,
    pageRange: [0, 0],
    doi: '',
    keywords: [],
    abstract: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const errorValidation: { [key: string]: string} = {};

    for (const field in formData) {
      const value = formData[field as keyof Article];
      if (!value || (typeof value === 'object' && !value.length)) {
        errorValidation[field] = `${field} is a required field`;
        console.log(errorValidation, formData);
      }
    }

    if (isNaN(formData.volume)) {
      errorValidation.volume = 'Volume must be a number';
    }

    if (isNaN(formData.issue)) {
      errorValidation.issue = 'Issue must be a number';
    }

    if(Object.keys(errorValidation).length > 0) {
      setErrors(errorValidation);
      return;
    }

    saveArticle(e, formData);
  }


  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  }

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <div className={styles.FormContent}>
        <div className={styles.LeftColumn}>
          <label> Article Title:
            <input className={styles.Input} onChange={handleForm} type="text" id="title" />
            {errors.title && <p className={styles.Error}>{errors.title}</p>}
          </label>
          <br/>
          <label> Author:
            <input className={styles.Input} onChange={handleForm} type="text" id="authors" />
            <button type="button">+</button>
            {errors.authors && <p className={styles.Error}>{errors.authors}</p>}
          </label>
          <br/>
          <label> Keywords:
            <input className={styles.Input} onChange={handleForm} type="text" id="keywords" />
            {errors.keywords && <p className={styles.Error}>{errors.keywords}</p>}
          </label>
          <br/>
          <label> Abstract:
           <input className={styles.Input} onChange={handleForm} type="text" id="abstract" />
           {errors.abstract && <p className={styles.Error}>{errors.abstract}</p>}
          </label>
        </div>
        <div className={styles.RightColumn}>
          <label> Journal:
            <input className={styles.Input} onChange={handleForm} type="text" id="journal" />
            {errors.journal && <p className={styles.Error}>{errors.journal}</p>}
          </label>
          <br/>
          <div className={styles.RightColumnRow}>
          <label> Date:
            <input className={styles.Input} onChange={handleForm} type="date" id="date" />
            {errors.date && <p className={styles.Error}>{errors.date}</p>}
          </label>
          <br/>
          <label> DOI:
            <input className={styles.Input} onChange={handleForm} type="text" id="doi" />
            {errors.doi && <p className={styles.Error}>{errors.doi}</p>}
          </label>
          <br/>
          </div>
          <div className={styles.RightColumnRow}>
          <label> Volume:
            <input className={styles.Input} onChange={handleForm} type="number" id="volume" />
            {errors.volume && <p className={styles.Error}>{errors.volume}</p>}
          </label>
          <br/>
          <label> Issue:
            <input className={styles.Input} onChange={handleForm} type="number" id="issue" />
            {errors.issue && <p className={styles.Error}>{errors.issue}</p>}
          </label>
          <br/>
          </div>
          <div className={styles.RightColumnRow}>
          <label> Page Range 1:
            <input className={styles.Input} onChange={handleForm} type="number" id="pageRange[0]" />
          </label>
          <label> Page Range 2:
            <input className={styles.Input} onChange={handleForm} type="number" id="pageRange[1]" />
          </label>
          </div>
        </div>
      </div>
          <button disabled={formData === undefined ? true : false} type="submit">Submit</button>
    </form>
  )
}

export default ArticleSubmissionForm
