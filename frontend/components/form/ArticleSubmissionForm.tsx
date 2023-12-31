import React, { useState } from 'react';
import { QueuedArticle } from '../../src/schema/queuedArticle';
import styles from './SubmissionForm.module.scss';
import KeywordsInput from './KeywordsInput';
import AuthorInput from './AuthorInput';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { DOI_CHECK_REGEX } from '../../src/common';

// IMPORTANT: Need to sync with URL_REGEX in /../backend/src/common.ts
const URL_REGEX = /\S*(?:http|www|\.\w+\/)\S+/g;

const DOMAIN = process.env.DOMAIN;

type Props = object;

type QueuedArticleSubmission = Omit<QueuedArticle, '_id'>;

const QueuedArticleSubmissionForm: React.FC<Props> = () => {
  const [formData, setFormData] = useState<QueuedArticleSubmission>({
    title: '',
    authors: [],
    date: '',
    journal: '',
    volume: 0,
    issue: 0,
    pageRange: [0, 0],
    doi: '',
    se_methods: [],
    claim: '',
    isModerated: false,
  });

  // When sendArticle is called the article data is in json format
  const sendArticle = async (formData: QueuedArticleSubmission): Promise<void> => {
    await fetch(DOMAIN + 'articles/new', {
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
        alert('Failed to submit article: ' + err);
      });
  };

  // Error handlings
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
    // Show warning when field contains URLs
    if (URL_REGEX.test(formData.claim)) {
      errorValidation.claim = `Claim must not contain a URL`;
      formData.claim = formData.claim.replace(URL_REGEX, '[URL removed]');
    }
    // DOI check making sure that it is a valid doi format
    const validDOI = DOI_CHECK_REGEX.test(formData.doi);
    if (!validDOI) {
      errorValidation.doi = 'Not a valid DOI!';
    }
    if (Object.values(errorValidation).filter((item) => item).length > 0) {
      setErrors(errorValidation);
      return;
    } else {
      sendArticle(formData);
    }
  };

  // handles the input form that updates the formData based on input
  const handleForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const index = e.currentTarget.dataset.index;
    const name = e.currentTarget.dataset.key as keyof QueuedArticleSubmission;
    const type = e.currentTarget.type;
    const rawValue = e.currentTarget.value;
    const value = type === 'number' ? parseInt(rawValue) : rawValue;
    const formKeys: Record<'single' | 'array', Array<keyof QueuedArticleSubmission>> = {
      single: ['title', 'date', 'journal', 'volume', 'issue', 'doi', 'claim'],
      array: ['authors', 'se_methods', 'pageRange'],
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

  // updates keywords with a new array
  const handleKeywordChange = (newArray: string[]) => {
    setFormData({ ...formData, ['se_methods']: newArray });
  };

  // updates authors with a new array
  const handleAuthorChange = (newArray: string[]) => {
    setFormData({ ...formData, ['authors']: newArray });
  };

  return (
    <div>
      <Form role="form" onSubmit={handleSubmit}>
        <Row>
          {/*title*/}
          <Form.Group as={Col} controlId="title">
            <Form.Label>Article Title</Form.Label>
            <Form.Control required data-key="title" onChange={handleForm} />
            {errors.title && <p className={styles.Error}>{errors.title}</p>}
          </Form.Group>
          {/*journal*/}
          <Form.Group as={Col} controlId="journal">
            <Form.Label>Journal</Form.Label>
            <Form.Control required data-key="journal" onChange={handleForm} />
            {errors.journal && <p className={styles.Error}>{errors.journal}</p>}
          </Form.Group>
        </Row>
        <Row className={styles.RightColumn}>
          <Form.Group as={Col} controlId="authors">
            {/*authors*/}
            <AuthorInput updateFormData={handleAuthorChange} dataKey={'authors'} />
            {errors.authors && <p className={styles.Error}>{errors.authors}</p>}
          </Form.Group>
          <Form.Group as={Col}>
            <Row>
              {/*date*/}
              <Form.Group as={Col} controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control required data-key="date" onChange={handleForm} type="date" />
                {errors.date && <p className={styles.Error}>{errors.date}</p>}
              </Form.Group>
              {/*doi*/}
              <Form.Group as={Col} controlId="doi">
                <Form.Label>DOI</Form.Label>
                <Form.Control required data-key="doi" placeholder="doi:10.1000/5501" onChange={handleForm} />
                {errors.doi && <p className={styles.Error}>{errors.doi}</p>}
              </Form.Group>
            </Row>
            <Row>
              {/*volume*/}
              <Form.Group as={Col} controlId="volume">
                <Form.Label>Volume</Form.Label>
                <Form.Control required data-key="volume" onChange={handleForm} type="number" />
                {errors.volume && <p className={styles.Error}>{errors.volume}</p>}
              </Form.Group>
              {/*issue*/}
              <Form.Group as={Col} controlId="issue">
                <Form.Label>Issue</Form.Label>
                <Form.Control required data-key="issue" onChange={handleForm} type="number" />
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
                      onChange={handleForm}
                      type="number"
                    />
                  </Form.Group>
                  {errors.pagerange && <p className={styles.Error}>{errors.pagerange}</p>}
                </Row>
              </Form.Group>
            </Row>
            <Row>
              {/*se methods*/}
              <KeywordsInput updateFormData={handleKeywordChange} dataKey={'se_methods'} defaultValue={[]} />
              {errors.se_methods && <p className={styles.Error}>{errors.se_methods}</p>}
            </Row>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="claim">
            <Form.Label>Claim</Form.Label>
            <Form.Control data-key="claim" as="textarea" rows={2} onChange={handleForm} />
            {errors.claim && <p className={styles.Error}>{errors.claim}</p>}
          </Form.Group>
        </Row>
        <Button type="submit" disabled={formData === undefined ? true : false}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default QueuedArticleSubmissionForm;
