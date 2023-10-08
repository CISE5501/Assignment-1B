import React, { useState } from 'react';
import { QueuedArticle } from '../src/schema/queuedArticle';
import styles from './SubmissionForm.module.scss';
import DOMAIN from '../DOMAIN';
import KeywordsInput from './KeywordsInput';
import { Article } from '@/schema/article';
import AuthorInput from './AuthorInput';
import { useForm } from 'react-hook-form'
import { Form, Col, Row, InputGroup, Button } from 'react-bootstrap';

export interface AnalystFormProps {
  info: QueuedArticle
}

type ArticleSubmission = Omit<Article, '_id'>;

const formatDate = (dateText: string) => {
  let sArray = dateText.split("-");
  let year = sArray[0];
  let month = sArray[1].padStart(2, '0');
  let day = sArray[2].padStart(2, '0');
  return `${year}-${month}-${day}`;
}

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
    if (isNaN(formData.volume)) {
      errorValidation.volume = 'Volume must be a number';
    }
    if (isNaN(formData.issue)) {
      errorValidation.issue = 'Issue must be a number';
    }
    if (!Array.isArray(formData.pageRange) || formData.pageRange.length !== 2) {
      errorValidation.pageRange = 'Page Range must be an array of two numbers';
    }
    if (formData.pageRange[0] > formData.pageRange[1]) {
      errorValidation.pageRange = 'First page range cannot be bigger than second!';
    }
    for (const author of formData.authors) {
      if (!author.includes(' ')) {
        errorValidation.authors = 'Author first and last name is required!';
      }
    }
    const doiCheckRegex = /doi:\S+\/\S+/;
    const validDOI = doiCheckRegex.test(formData.doi);
    if (!validDOI) {
      errorValidation.doi = 'Not a valid DOI!';
    }
    if (Object.values(errorValidation).filter((item) => item).length > 0) {
      setErrors(errorValidation);
      return;
    } else {
      sendArticle(JSON.stringify(formData,), articleData._id);
    }
  };

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

  const handleAuthorChange = (newArray: string[]) => {
    setFormData({ ...formData, ["authors"]: newArray });
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
            <AuthorInput updateFormData={handleAuthorChange} dataKey={"authors"} defaultValue={articleData.authors} />
            {errors.keywords && <p className={styles.Error}>{errors.keywords}</p>}
          </label>
          <br />
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
