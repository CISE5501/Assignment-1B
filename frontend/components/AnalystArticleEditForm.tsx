import React, { useState, FormEvent } from 'react';
import { QueuedArticle } from '../src/schema/queuedArticle';
import styles from './SubmissionForm.module.scss';
import DOMAIN from '../DOMAIN';
import KeywordsInput from './KeywordsInput';
import { Article } from '@/schema/article';
import { useRouter } from 'next/navigation'
import { NextResponse } from 'next/server';

//TODO
//check the date display format- DONE
//check that the author creates new filled in input with every entry
//check keywords

export interface AnalystFormProps {
  info: QueuedArticle
}

//type QueuedArticleSubmission = Omit<QueuedArticle, '_id' | 'isModerated'>;
type ArticleSubmission = Omit<Article, '_id'>;

const deleteOldArticle = async (id: string): Promise<any> => {
  const response = await fetch(DOMAIN + 'analyst/id/' + id, {
    method: 'DELETE',
  });
  if (response.ok) {
    alert('Successfully deleted.');
    window.location.replace('/analyst');
  } else {
    alert('Failed to delete.');
  }
};

const sendArticle = async (data: string, id: string): Promise<void> => {
  console.log(data);
  const response = await fetch(DOMAIN + 'analyst', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data
  });
  if (response.ok) {
    alert(response.status + ' Successfully sent article');
    console.log(response.status);
    deleteOldArticle(id);
  } else {
    alert('Failed');
  }
};

const AnalystArticleSubmissionForm: React.FC<AnalystFormProps> = (data) => {
  let articleData = data.info;
  const [formData, setFormData] = useState<ArticleSubmission>({
    title: articleData.title,
    authors: articleData.authors,
    date: articleData.date,
    journal: articleData.journal,
    volume: articleData.volume,
    issue: articleData.issue,
    pageRange: [articleData.pageRange[0], articleData.pageRange[1]],
    doi: articleData.doi,
    keywords: articleData.keywords,
    abstract: articleData.abstract,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorValidation: { [key: string]: string } = {};
    for (const field in formData) {
      const value = formData[field as keyof ArticleSubmission];
      errorValidation[field] = '';
      if (
        // TODO clean up this check
        field !== 'isModerated' &&
        (!value ||
          (field === 'pageRange' && (formData.pageRange[0] === 0 || formData.pageRange[1] === 0)) ||
          ((field === 'authors') && formData[field].length === 0))
      ) {
        errorValidation[field] = `${field} must not be empty`;
      }
    }
    if (Object.values(errorValidation).filter((item) => item).length > 0) {
      setErrors(errorValidation);
      alert('ERR' + JSON.stringify(errorValidation));
      return;
    } else {
      sendArticle(JSON.stringify(formData,), articleData._id);
    }
  };

  const formatDate = (dateText: string) => {
    let sArray = dateText.split("-");
    let year = sArray[0];
    let month = sArray[1].padStart(2, '0');
    let day = sArray[2].padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    const index = e.currentTarget.dataset.index;
    const name = e.currentTarget.dataset.key as keyof ArticleSubmission;
    const type = e.currentTarget.type;
    const rawValue = e.currentTarget.value;
    const value = type === 'number' ? parseInt(rawValue) : rawValue;
    const formKeys: Record<'single' | 'array', Array<keyof ArticleSubmission>> = {
      single: ['title', 'date', 'journal', 'volume', 'issue', 'doi', 'abstract'],
      array: ['authors', 'keywords', 'pageRange'],
    };

    if (!name) throw `Form item ${name} has no name parameter!`;
    if (formKeys.single.includes(name)) {
      const newData = { [name]: value };
      setFormData({ ...formData, ...newData });
    } else if (formKeys.array.includes(name)) {
      if (!index) throw `Form item ${name} has no index parameter!`;
      const newArray = formData[name] as Array<string | number>;
      newArray[+index] = value;
      setFormData({ ...formData, [name]: newArray });
    }
  };

  const handleKeywordChange = (newArray: string[]) => {
    setFormData({ ...formData, ["keywords"]: newArray });
  }

  // TODO change onChange to on deselect
  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <div className={styles.FormContent}>
        <div className={styles.LeftColumn}>
          <label>
            {' '}
            Article Title:
            <input className={styles.Input} onChange={handleForm} type="text" data-key="title" defaultValue={articleData.title} required />
            {errors.title && <p className={styles.Error}>{errors.title}</p>}
          </label>
          <br />
          <label>
            {' '}
            Author:
            <input
              className={styles.Input}
              onChange={handleForm}
              type="text"
              data-key="authors"
              data-index="0"
              defaultValue={articleData.authors}
              required
            />
            <button type="button">+</button>
            {errors.authors && <p className={styles.Error}>{errors.authors}</p>}
          </label>
          <br />
          <div>

          </div>
          <label>
            {' '}
            <KeywordsInput updateFormData={handleKeywordChange} dataKey={"keywords"} defaultValue={articleData.keywords} />
            {errors.keywords && <p className={styles.Error}>{errors.keywords}</p>}
          </label>
          <br />
          <label>
            {' '}
            Abstract:
            <input className={styles.Input} onChange={handleForm} type="text" data-key="abstract" defaultValue={articleData.abstract} />
            {errors.abstract && <p className={styles.Error}>{errors.abstract}</p>}
          </label>
        </div>
        <div className={styles.RightColumn}>
          <label>
            {' '}
            Journal:
            <input className={styles.Input} onChange={handleForm} type="text" data-key="journal" defaultValue={articleData.journal} required />
            {errors.journal && <p className={styles.Error}>{errors.journal}</p>}
          </label>
          <br />
          <div className={styles.RightColumnRow}>
            <label>
              {' '}
              Date:
              <input className={styles.Input} onChange={handleForm} type="date" data-key="date" defaultValue={formatDate(articleData.date)} required />
              {errors.date && <p className={styles.Error}>{errors.date}</p>}
            </label>
            <br />
            <label>
              {' '}
              DOI:
              <input className={styles.Input} onChange={handleForm} type="text" data-key="doi" defaultValue={articleData.doi} required />
              {errors.doi && <p className={styles.Error}>{errors.doi}</p>}
            </label>
            <br />
          </div>
          <div className={styles.RightColumnRow}>
            <label>
              {' '}
              Volume:
              <input className={styles.Input} onChange={handleForm} type="number" data-key="volume" defaultValue={articleData.volume} required />
              {errors.volume && <p className={styles.Error}>{errors.volume}</p>}
            </label>
            <br />
            <label>
              {' '}
              Issue:
              <input className={styles.Input} onChange={handleForm} type="number" data-key="issue" defaultValue={articleData.issue} required />
              {errors.issue && <p className={styles.Error}>{errors.issue}</p>}
            </label>
            <br />
          </div>
          <div className={styles.RightColumnRow}>
            <label>
              {' '}
              Page Range 1:
              <input
                className={styles.Input}
                onChange={handleForm}
                type="number"
                data-key="pageRange"
                data-index="0"
                defaultValue={articleData.pageRange[0]}
              />
            </label>
            <label>
              {' '}
              Page Range 2:
              <input
                className={styles.Input}
                onChange={handleForm}
                type="number"
                data-key="pageRange"
                data-index="1"
                defaultValue={articleData.pageRange[1]}
              />
            </label>
            <label>
              <br />
              {errors.pageRange && <p className={styles.Error}>{errors.pageRange}</p>}
            </label>
          </div>
        </div>
      </div>
      <button disabled={formData === undefined ? true : false}>
        Save & Exit
      </button>
      <button disabled={formData === undefined ? true : false} type="submit">
        Submit
      </button>
    </form>
  );
};

export default AnalystArticleSubmissionForm;
