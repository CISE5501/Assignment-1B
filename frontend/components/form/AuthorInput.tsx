import { ChangeEvent, useState } from 'react';
import { Form, Col, InputGroup, Button } from 'react-bootstrap';

interface AuthorInputProps {
  defaultValue?: string[];
  dataKey: string;
  updateFormData: (newArray: string[]) => void;
}

interface AuthorField {
  id: number;
  value: string;
}

function getValues(array: AuthorField[]): string[] {
  return array.map((field) => field.value);
}

const AuthorInput = ({ defaultValue, dataKey, updateFormData }: AuthorInputProps) => {
  const [authorFields, setAuthorFields] = useState<AuthorField[]>(
    defaultValue?.map((value, index) => ({ id: index, value: value})) || [{id: 0, value: ""}],
  );
  const [index, setIndex] = useState<number[]>(authorFields.map((field, index) => index));
  const [counter, setCounter] = useState<number>(authorFields.length);
  const [tempIndex, setTempIndex] = useState<number>(0);

  //console.log("index: " + index + "counter: "+ counter);
  const handleAuthorChange = (e: React.FormEvent<HTMLInputElement>, id: number) => {
    const updatedAuthorFields = authorFields.map((field) =>
      field.id === id ? { ...field, value: e.currentTarget.value as string } : field,
    );
    setAuthorFields(updatedAuthorFields);
    updateFormData(getValues(authorFields));
  };

  const addAuthor = () => {
    if (tempIndex !== 0) {
      setIndex((prevIndexes) => [...prevIndexes, tempIndex]);
      setAuthorFields([...authorFields, { id: tempIndex, value: '' }]);
      setTempIndex(0);
    } else {
      setIndex((prevIndexes) => [...prevIndexes, counter]);
      setAuthorFields([...authorFields, { id: counter, value: '' }]);
    }
    setCounter((prevCounter) => prevCounter + 1);
    updateFormData(getValues(authorFields));

    //console.log("index: " + index + "counter: "+ counter);
  };

  const deleteAuthor = (id: number) => {
    if (authorFields.length == 1) {
      return;
    } else if (id < counter - 1) {
      setTempIndex(id);
    }
    const updatedAuthorFields = authorFields.filter((field) => field.id !== id);
    setAuthorFields(updatedAuthorFields);
    setIndex((prevIndexes) => [...prevIndexes.filter((item) => item !== id)]);
    setCounter((prevCounter) => prevCounter - 1);
    updateFormData(getValues(authorFields));

    //console.log("index: " + index + "counter: "+ counter);
  };

  return (
    <Form.Group as={Col} controlId={dataKey} data-key={dataKey}>
      {authorFields.map((index) => {
        return (
          <fieldset key={index.id}>
            <Form.Label>Author</Form.Label>
            <InputGroup>
              <Form.Control
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleAuthorChange(e, index.id)}
                defaultValue={index.value} placeholder='John Doe'
              />
              <Button type="button" onClick={() => deleteAuthor(index.id)}>
                X
              </Button>
            </InputGroup>
          </fieldset>
        );
      })}
      <Button className="mt-3 mb-3" type="button" onClick={addAuthor} id="addAuthor">
        Add Author
      </Button>
    </Form.Group>
  );
};

export default AuthorInput;
