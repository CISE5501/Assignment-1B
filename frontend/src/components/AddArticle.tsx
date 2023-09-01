import React, { useState } from 'react'

type Props = { 
  saveArticle: (e: React.FormEvent, formData: IArticle | any) => void 
}

const AddArticle: React.FC<Props> = ({ saveArticle }) => {
  const [formData, setFormData] = useState<IArticle | {}>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  return (
    <form className='Form' onSubmit={(e) => saveArticle(e, formData)}>
      <div>
        <div>
          <label htmlFor='title'>Title</label>
          <input onChange={handleForm} type='text' id='title' />
        </div>
        <div>
          <label htmlFor='author'>Author</label>
          <input onChange={handleForm} type='text' id='author' />
        </div>
        <div>
          <label htmlFor='doi'>DOI</label>
          <input onChange={handleForm} type='text' id='doi' />
        </div>
      </div>
      <button disabled={formData === undefined ? true: false} >Add Article</button>
    </form>
  )
}

export default AddArticle