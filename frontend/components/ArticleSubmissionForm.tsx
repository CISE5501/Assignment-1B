import React, { useState } from 'react'
import { Article } from "../src/schema/article"

type Props = { 
  saveArticle: (e: React.FormEvent, formData: Article | unknown) => void;
}

const ArticleSubmissionForm: React.FC<Props> = ({ saveArticle }) => {
  const [formData, setFormData] = useState<Article | object>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  }

  return (
    <form className='Form' onSubmit={(e) => saveArticle(e, formData)}>
          <label>
            Article Title:
            <input onChange={handleForm} type="text" name="title" />
          </label>
          <br/>
          <label>
            Author:
            <input onChange={handleForm} type="text" name="author" />
            <button type="button">+</button>
          </label>
          <br/>
          <label>
            Keywords:
            <input onChange={handleForm} type="text" name="keywords" />
          </label>
          <br/>
          <label>
            Journal:
            <input onChange={handleForm} type="text" name="journal" />
          </label>
          <br/>
          <label>
            Date:
            <input onChange={handleForm} type="date" name="date" />
          </label>
          <br/>
          <label>
            DOI:
            <input onChange={handleForm} type="text" name="doi" />
          </label>
          <br/>
          <label>
            Volume:
            <input onChange={handleForm} type="number" name="volume" />
          </label>
          <br/>
          <label>
            Issue:
            <input onChange={handleForm} type="number" name="issue" />
          </label>
          <br/>
          <label>
            Page Range:
            <input onChange={handleForm} type="number" name="rangeone" />
            <input onChange={handleForm} type="number" name="rangetwo" />
          </label>
          <br/>
          <label>
              <button type="button">submit</button>
          </label>
    </form>
  )
}

export default ArticleSubmissionForm
