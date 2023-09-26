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
            <input onChange={handleForm} type="text" id="title" />
          </label>
          <br/>
          <label>
            Author:
            <input onChange={handleForm} type="text" id="author" />
            <button type="button">+</button>
          </label>
          <br/>
          <label>
            Keywords:
            <input onChange={handleForm} type="text" id="keywords" />
          </label>
          <br/>
          <label>
            Journal:
            <input onChange={handleForm} type="text" id="journal" />
          </label>
          <br/>
          <label>
            Date:
            <input onChange={handleForm} type="date" id="date" />
          </label>
          <br/>
          <label>
            DOI:
            <input onChange={handleForm} type="text" id="doi" />
          </label>
          <br/>
          <label>
            Volume:
            <input onChange={handleForm} type="number" id="volume" />
          </label>
          <br/>
          <label>
            Issue:
            <input onChange={handleForm} type="number" id="issue" />
          </label>
          <br/>
          <label>
            Page Range:
            <input onChange={handleForm} type="number" id="rangeone" />
            <input onChange={handleForm} type="number" id="rangetwo" />
          </label>
          <br/>
          <label>
            <button disabled={formData === undefined ? true : false} type="submit">Submit</button>
          </label>
    </form>
  )
}

export default ArticleSubmissionForm
