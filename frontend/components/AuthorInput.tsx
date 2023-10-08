import { useState } from 'react';
import styles from './SubmissionForm.module.scss';

interface AuthorInputProps {
    defaultValue: string[];
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
    const [authorFields, setAuthorFields] = useState<AuthorField[]>(defaultValue.map((value, index) => ({ id: index, value: value })));
    const [index, setIndex] = useState<number[]>(authorFields.map((field) => field.id));
    const [counter, setCounter] = useState<number>(authorFields.length);

    const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const updatedAuthorFields = authorFields.map((field) =>
            field.id === id ? { ...field, value: e.target.value } : field,
        );
        setAuthorFields(updatedAuthorFields);
        updateFormData(getValues(authorFields));
    };

    const addAuthor = () => {
        const newIndex = [...index, counter];
        setIndex(newIndex);
        setAuthorFields([...authorFields, { id: counter, value: '' }]);
        setCounter(counter + 1);
        updateFormData(getValues(authorFields));
    };

    const deleteAuthor = (id: number) => {
        if (authorFields.length == 1) {
            return;
        }
        const updatedAuthorFields = authorFields.filter((field) => field.id !== id);
        setAuthorFields(updatedAuthorFields);
        updateFormData(getValues(authorFields));
    };

    return (
        <div>
            {authorFields.map((field) => (
                <div className={styles.AuthorContainer} key={field.id}>
                    <label>
                        {' '}
                        Author:
                        <input
                            className={styles.Input}
                            required
                            onChange={(e) => handleAuthorChange(e, field.id)}
                            type="text"
                            value={field.value}
                            data-key={dataKey}
                            data-index={field.id}
                        />
                        <button type="button" onClick={() => deleteAuthor(field.id)}>
                            x
                        </button>
                    </label>
                </div>
            ))}
            <button type="button" onClick={addAuthor}>
                Add Author
            </button>
        </div>
    )
}

export default AuthorInput;