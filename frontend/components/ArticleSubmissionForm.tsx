import React, { useState, FormEvent, ChangeEvent } from 'react';
import { QueuedArticle } from '../src/schema/queuedArticle';
import styles from './SubmissionForm.module.scss';
import DOMAIN from '..//DOMAIN';

type Props = object;

type QueuedArticleSubmission = Omit<QueuedArticle, '_id'>;

const ArticleSubmissionForm: React.FC<Props> = () => {
  const [formData, setFormData] = useState<QueuedArticleSubmission>({
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
    isModerated: false,
  });

  interface AuthorField {
    id: number;
    value: string;
  }

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [index, setIndex] = useState<number[]>([]);
  const [counter, setCounter] = useState<number>(1);
  const [authorFields, setAuthorFields] = useState<AuthorField[]>([{ id: 0, value: '' }]);

  const handleSubmit = (e: FormEvent) => {
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
      setErrors({});
    }

    fetch(DOMAIN + 'articles/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Successfully submitted article');
          window.location.reload();
        }
      })
      .catch((err) => {
        alert('Failed to submit article');
        console.log(err);
      });
  };

  const handleForm = (e: ChangeEvent<HTMLInputElement>): void => {
    const index = e.currentTarget.dataset.index;
    const name = e.currentTarget.dataset.key as keyof QueuedArticleSubmission;
    const type = e.currentTarget.type;
    const rawValue = e.currentTarget.value;
    const value = type === 'number' ? parseInt(rawValue) : rawValue;
    const formKeys: Record<'single' | 'array', Array<keyof QueuedArticleSubmission>> = {
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

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const updatedAuthorFields = authorFields.map((field) =>
      field.id === id ? { ...field, value: e.target.value } : field,
    );
    setAuthorFields(updatedAuthorFields);
    handleForm(e);
  };

  const addAuthor = () => {
    const newIndex = [...index, counter];
    setIndex(newIndex);

    setAuthorFields([...authorFields, { id: counter, value: '' }]);
    setCounter(counter + 1);
  };

  const deleteAuthor = (id: number) => {
    if (authorFields.length == 1) {
      return;
    }

    const updatedAuthorFields = authorFields.filter((field) => field.id !== id);
    setAuthorFields(updatedAuthorFields);
  };

  // TODO change onChange to on deselect
  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <div className={styles.FormContent}>
        <div className={styles.LeftColumn}>
          <label>
            {' '}
            Article Title:
            <input required className={styles.Input} onChange={handleForm} type="text" data-key="title" />
            {errors.title && <p className={styles.Error}>{errors.title}</p>}
          </label>
          <br />
          {authorFields.map((field) => (
            <div key={field.id}>
              <label>
                {' '}
                Author:
                <input
                  required
                  className={styles.Input}
                  onChange={(e) => handleAuthorChange(e, field.id)}
                  type="text"
                  value={field.value}
                  data-key="authors"
                  data-index={field.id}
                />
                {errors.authors && <p className={styles.Error}>{errors.authors}</p>}
                <button type="button" onClick={addAuthor}>
                  +
                </button>
                <button type="button" onClick={() => deleteAuthor(field.id)}>
                  -
                </button>
              </label>
            </div>
          ))}
          <br />
          <label>
            {' '}
            Keywords:
            <input
              required
              className={styles.Input}
              onChange={handleForm}
              type="text"
              data-key="keywords"
              data-index="0"
            />
            {errors.keywords && <p className={styles.Error}>{errors.keywords}</p>}
          </label>
          <br />
          <label>
            {' '}
            Abstract:
            <input required className={styles.Input} onChange={handleForm} type="text" data-key="abstract" />
            {errors.abstract && <p className={styles.Error}>{errors.abstract}</p>}
          </label>
        </div>
        <div className={styles.RightColumn}>
          <label>
            {' '}
            Journal:
            <input required className={styles.Input} onChange={handleForm} type="text" data-key="journal" />
            {errors.journal && <p className={styles.Error}>{errors.journal}</p>}
          </label>
          <br />
          <div className={styles.RightColumnRow}>
            <label>
              {' '}
              Date:
              <input required className={styles.Input} onChange={handleForm} type="date" data-key="date" />
              {errors.date && <p className={styles.Error}>{errors.date}</p>}
            </label>
            <br />
            <label>
              {' '}
              DOI:
              <input className={styles.Input} onChange={handleForm} type="text" data-key="doi" />
              {errors.doi && <p className={styles.Error}>{errors.doi}</p>}
            </label>
            <br />
          </div>
          <div className={styles.RightColumnRow}>
            <label>
              {' '}
              Volume:
              <input className={styles.Input} onChange={handleForm} type="number" data-key="volume" />
              {errors.volume && <p className={styles.Error}>{errors.volume}</p>}
            </label>
            <br />
            <label>
              {' '}
              Issue:
              <input required className={styles.Input} onChange={handleForm} type="number" data-key="issue" />
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
              />
            </label>
            <label>
              <br />
              {errors.pageRange && <p className={styles.Error}>{errors.pageRange}</p>}
            </label>
          </div>
        </div>
      </div>
      <button disabled={formData === undefined ? true : false} type="submit">
        Submit
      </button>
    </form>
  );
};

export default ArticleSubmissionForm;
