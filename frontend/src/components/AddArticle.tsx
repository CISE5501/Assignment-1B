import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Col, Row, InputGroup, Button } from 'react-bootstrap';

type Props = {
  saveArticle: (e: React.FormEvent, formData: IArticle | any) => void
}

const AddArticle: React.FC<Props> = ({ saveArticle }) => {
  const [pageRange, setPageRange] = useState<number[]>([])
  const [indexes, setIndexes] = useState<number[]>([]);
  const [counter, setCounter] = React.useState(0);
  const [formData, setFormData] = useState<IArticle | {}>({
    pageRange: pageRange,
  })

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData, [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let index = e.currentTarget.id === 'pageStart' ? 0 : 1
    let newArr = pageRange
    newArr[index] = parseInt(e.currentTarget.value)
    setPageRange(newArr);
  }

  const addAuthor = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
  }

  const removeAuthor = (index: number)  => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
    setCounter(prevCounter => prevCounter - 1);
  };

  return (
    <Form onSubmit={(e) => saveArticle(e, formData)}>
      <Row>
        <Form.Group as={Col} controlId='title'>
          <Form.Label>Article Title</Form.Label>
          <Form.Control onChange={handleForm} />
        </Form.Group>
        <Form.Group as={Col} controlId='journal' >
          <Form.Label>Journal</Form.Label>
          <Form.Control onChange={handleForm} />
        </Form.Group>
      </Row>
      <Row>
      <Form.Group as={Col} controlId='authors'>
        {indexes.map((index) => {
          const fieldName = `authors[${index}]`;
          return (
            <fieldset name={fieldName} key={fieldName}>
                <Form.Label>Author</Form.Label>
                <InputGroup>
                <Form.Control onChange={handleForm} />
                <Button type='button' onClick={() => removeAuthor(index)} id='removeAuthor'>Remove Author</Button>
              </InputGroup>
            </fieldset>
          )
        }
        )}
        <Button className='mt-3 mb-3' type='button' onClick={addAuthor} id='addAuthor'>Add Author</Button>
        </Form.Group>

        <Form.Group as={Col}>
          <Row>
            <Form.Group as={Col} controlId='date'>
              <Form.Label>Date</Form.Label>
              <Form.Control onChange={handleForm} type='date' />
            </Form.Group>
            <Form.Group as={Col} controlId='doi'>
              <Form.Label>DOI</Form.Label>
              <Form.Control onChange={handleForm} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId='volume'>
              <Form.Label>Volume</Form.Label>
              <Form.Control onChange={handleForm} type='number' />
            </Form.Group>
            <Form.Group as={Col} controlId='issue'>
              <Form.Label>Issue</Form.Label>
              <Form.Control onChange={handleForm} type='number' />
            </Form.Group>
          </Row>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId='keywords'>
          <Form.Label>Keywords</Form.Label>
          <Form.Control onChange={handleForm} />
        </Form.Group>
        <Form.Group as={Col}>
          <Row>
            <Form.Group as={Col} controlId='pageStart'>
              <Form.Label>Page Start</Form.Label>
              <Form.Control onChange={handlePageChange} type='number' />
            </Form.Group>
            <Form.Group as={Col} controlId='pageEnd'>
              <Form.Label>Page End</Form.Label>
              <Form.Control onChange={handlePageChange} type='number' />
            </Form.Group>
          </Row>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId='abstract'>
          <Form.Label>Abstract</Form.Label>
          <Form.Control as="textarea" rows={3} onChange={handleForm} />
        </Form.Group>
      </Row>
      <Button type='submit' disabled={formData === undefined ? true : false}>Add Article</Button>
    </Form>
  )
}

export default AddArticle