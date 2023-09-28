import React, { useState, FormEvent} from 'react';
import { Article } from "../src/schema/article";
import styles from './SubmissionForm.module.css';

type Props = { 
  saveArticle: (e: React.FormEvent, formData: Article | unknown) => void;
}

const ArticleSubmissionForm: React.FC<Props> = ({ saveArticle }) => {
  const [formData, setFormData] = useState<Article>({
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

    if (!Array.isArray(formData.pageRange) || formData.pageRange.length !== 2) {
      errorValidation.pageRange = 'Page Range must be an array of two numbers';
    }

    if(Object.keys(errorValidation).length > 0) {
      setErrors(errorValidation);
      return;
    }

    saveArticle(e, formData);
  }


  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    const index = e.currentTarget.dataset.index;
    const name = e.currentTarget.dataset.key as keyof Article;
    const type = e.currentTarget.type;
    const rawValue = e.currentTarget.value;
    const value = type === 'number' ? parseInt(rawValue) : rawValue;
    const formKeys: Record<'single'|'array', Array<keyof Article>> = {
      single: ['title','date','journal','volume','issue','doi','abstract'],
      array: ['authors','keywords','pageRange'],
    };

    if (!name)
      throw `Form item ${name} has no name parameter!`;
    if (formKeys.single.includes(name)) {
      const newData = {[name]: value};
      setFormData({...formData, ...newData});
    } else if (formKeys.array.includes(name)) {
      if (!index)
        throw `Form item ${name} has no index parameter!`;
      const newArray = formData[name] as Array<string|number>;
      newArray[+index] = value;
      setFormData({...formData, [name]: newArray});
    }
  }

  // TODO change onChange to on deselect
  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <div className={styles.FormContent}>
        <div className={styles.LeftColumn}>
          <label> Article Title:
            <input className={styles.Input} onChange={handleForm} type="text" data-key="title" />
            {errors.title && <p className={styles.Error}>{errors.title}</p>}
          </label>
          <br/>
          <label> Author:
            <input className={styles.Input} onChange={handleForm} type="text" data-key="authors" data-index="0" />
            <button type="button">+</button>
            {errors['authors.0'] && <p className={styles.Error}>{errors['authors.0']}</p>}
          </label>
          <br/>
          <label> Keywords:
            <input className={styles.Input} onChange={handleForm} type="text" data-key="keywords" data-index="0" />
            {errors['keywords.0'] && <p className={styles.Error}>{errors['keywords.0']}</p>}
          </label>
          <br/>
          <label> Abstract:
           <input className={styles.Input} onChange={handleForm} type="text" data-key="abstract" />
           {errors.abstract && <p className={styles.Error}>{errors.abstract}</p>}
          </label>
        </div>
        <div className={styles.RightColumn}>
          <label> Journal:
            <input className={styles.Input} onChange={handleForm} type="text" data-key="journal" />
            {errors.journal && <p className={styles.Error}>{errors.journal}</p>}
          </label>
          <br/>
          <div className={styles.RightColumnRow}>
          <label> Date:
            <input className={styles.Input} onChange={handleForm} type="date" data-key="date" />
            {errors.date && <p className={styles.Error}>{errors.date}</p>}
          </label>
          <br/>
          <label> DOI:
            <input className={styles.Input} onChange={handleForm} type="text" data-key="doi" />
            {errors.doi && <p className={styles.Error}>{errors.doi}</p>}
          </label>
          <br/>
          </div>
          <div className={styles.RightColumnRow}>
          <label> Volume:
            <input className={styles.Input} onChange={handleForm} type="number" data-key="volume" />
            {errors.volume && <p className={styles.Error}>{errors.volume}</p>}
          </label>
          <br/>
          <label> Issue:
            <input className={styles.Input} onChange={handleForm} type="number" data-key="issue" />
            {errors.issue && <p className={styles.Error}>{errors.issue}</p>}
          </label>
          <br/>
          </div>
          <div className={styles.RightColumnRow}>
          <label> Page Range:
            <input className={styles.Input} onChange={handleForm} type="number" data-key="pageRange" data-index="0" />
            <input className={styles.Input} onChange={handleForm} type="number" data-key="pageRange" data-index="1" />
            {errors['pageRange.0'] && <p className={styles.Error}>{errors['pageRange.0']}</p>}
            {errors['pageRange.1'] && <p className={styles.Error}>{errors['pageRange.1']}</p>}
          </label>
          </div>
        </div>
      </div>
          <button disabled={formData === undefined ? true : false} type="submit">Submit</button>
    </form>
  )
}

export default ArticleSubmissionForm
