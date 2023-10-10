import React, { useState } from 'react';
import { QueuedArticle } from '../src/schema/queuedArticle';
import styles from './SubmissionForm.module.scss';
import DOMAIN from '@/common/DOMAIN';
import KeywordsInput from './KeywordsInput';
import { Article } from '@/schema/article';
import AuthorInput from './AuthorInput';
import { Form, Col, Row, Button } from 'react-bootstrap';

export interface AnalystFormProps {
  info: QueuedArticle;
}

type ArticleSubmission = Omit<Article, '_id'>;

const formatDate = (dateText: string) => {
  const sArray = dateText.split('-');
  const year = sArray[0];
  const month = sArray[1].padStart(2, '0');
  const day = sArray[2].padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const deleteOldArticle = async (id: string): Promise<void> => {
  const response = await fetch(DOMAIN + 'analyst/id/' + id, {
    method: 'DELETE',
  });
  if (response.ok) {
    window.location.replace('/analyst');
  } else {
    alert('Failed to delete old article.');
  }
};

const sendArticle = async (data: string, id: string): Promise<void> => {
  const response = await fetch(DOMAIN + 'analyst', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });
  if (response.ok) {
    alert('Successfully sent article');
    deleteOldArticle(id); //comment this line out if you don't want to create articles every time
  } else {
    alert('Failed');
  }
};

const AnalystArticleSubmissionForm: React.FC<AnalystFormProps> = (data) => {
  const articleData = data.info;
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
      console.log(errorValidation);

      return;
    } else {
      sendArticle(JSON.stringify(formData), articleData._id);
    }
  };

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
    setFormData({ ...formData, ['keywords']: newArray });
  };

  const handleAuthorChange = (newArray: string[]) => {
    setFormData({ ...formData, ['authors']: newArray });
  };

  // TODO change onChange to on deselect
  return (
    <div>
      <Form role="form" onSubmit={handleSubmit}>
        <Row className={styles.LeftColumn}>
          {/*title*/}
          <Form.Group as={Col} controlId="title">
            <Form.Label>Article Title</Form.Label>
            <Form.Control required data-key="title" onChange={handleForm} defaultValue={articleData.title} />
            {errors.title && <p className={styles.Error}>{errors.title}</p>}
          </Form.Group>
          {/*journal*/}
          <Form.Group as={Col} controlId="journal">
            <Form.Label>Journal</Form.Label>
            <Form.Control
              required
              data-key="journal"
              defaultValue={articleData.journal}
              onChange={handleForm}
            />
            {errors.journal && <p className={styles.Error}>{errors.journal}</p>}
          </Form.Group>
        </Row>
        <Row className={styles.RightColumn}>
          <Form.Group as={Col} controlId="authors">
            {/*authors*/}
            <AuthorInput
              updateFormData={handleAuthorChange}
              dataKey={'authors'}
              defaultValue={articleData.authors}
            />
            {errors.authors && <p className={styles.Error}>{errors.authors}</p>}
          </Form.Group>
          <Form.Group as={Col}>
            <Row>
              {/*date*/}
              <Form.Group as={Col} controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  required
                  data-key="date"
                  defaultValue={formatDate(articleData.date)}
                  onChange={handleForm}
                  type="date"
                />
                {errors.date && <p className={styles.Error}>{errors.date}</p>}
              </Form.Group>
              {/*doi*/}
              <Form.Group as={Col} controlId="doi">
                <Form.Label>DOI</Form.Label>
                <Form.Control required data-key="doi" defaultValue={articleData.doi} onChange={handleForm} />
                {errors.doi && <p className={styles.Error}>{errors.doi}</p>}
              </Form.Group>
            </Row>
            <Row>
              {/*volume*/}
              <Form.Group as={Col} controlId="volume">
                <Form.Label>Volume</Form.Label>
                <Form.Control
                  required
                  data-key="volume"
                  defaultValue={articleData.volume}
                  onChange={handleForm}
                  type="number"
                />
                {errors.volume && <p className={styles.Error}>{errors.volume}</p>}
              </Form.Group>
              {/*issue*/}
              <Form.Group as={Col} controlId="issue">
                <Form.Label>Issue</Form.Label>
                <Form.Control
                  required
                  data-key="issue"
                  defaultValue={articleData.issue}
                  onChange={handleForm}
                  type="number"
                />
                {errors.issue && <p className={styles.Error}>{errors.issue}</p>}
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Row>
                  {/*pageRange*/}
                  <Form.Group as={Col} controlId="pageRange">
                    <Form.Label>Page Start</Form.Label>
                    <Form.Control
                      required
                      data-key="pageRange"
                      data-index="0"
                      defaultValue={articleData.pageRange[0]}
                      onChange={handleForm}
                      type="number"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="pageRange">
                    <Form.Label>Page End</Form.Label>
                    <Form.Control
                      required
                      data-key="pageRange"
                      data-index="1"
                      defaultValue={articleData.pageRange[1]}
                      onChange={handleForm}
                      type="number"
                    />
                  </Form.Group>
                  {errors.pagerange && <p className={styles.Error}>{errors.pagerange}</p>}
                </Row>
              </Form.Group>
            </Row>
            <Row>
              {/*keywords*/}
              <KeywordsInput
                updateFormData={handleKeywordChange}
                dataKey={'keywords'}
                defaultValue={articleData.keywords}
              />
              {errors.keywords && <p className={styles.Error}>{errors.keywords}</p>}
            </Row>
          </Form.Group>
        </Row>
        <Row className={styles.LeftColumn}>
          <Form.Group as={Col} controlId="abstract">
            <Form.Label>Abstract</Form.Label>
            <Form.Control data-key="abstract" as="textarea" rows={2} onChange={handleForm} />
            {errors.abstract && <p className={styles.Error}>{errors.abstract}</p>}
          </Form.Group>
        </Row>
        <Button type="submit" disabled={formData === undefined ? true : false}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AnalystArticleSubmissionForm;