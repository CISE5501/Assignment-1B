import React from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { QueuedArticle } from '@/src/schema/queuedArticle';
import SortableTable, { ComputedRow, DataRow } from '@/components/table/SortableTable';
import { PageProps, handleDelete } from '@/common/queueCommon';
import { getServerData } from '@/common/queueCommon';

export type IndexProps = PageProps;
export const getServerSideProps = getServerData('moderator/index');

//returns table using data from queuedArticles where isModerated = false
const Index = ({ queueData, duplicates }: PageProps) => {
  const headersList: ((DataRow & { key: keyof QueuedArticle }) | ComputedRow)[] = [
    { key: 'title', label: 'Title' },
    { key: 'authors', label: 'Authors', displayAs: (authors) => authors.join('; ') },
    { key: 'date', label: 'Date' },
    { key: 'journal', label: 'Journal' },
    { key: 'volume', label: 'Volume' },
    { key: 'issue', label: 'Issue' },
    { key: 'pageRange', label: 'Page Range', displayAs: ([start, end]) => (start + '-' + end) },
    { key: 'doi', label: 'DOI' },
    { key: 'keywords', label: 'Keywords', displayAs: (keywords) => keywords.join(', ') },
    { key: 'abstract', label: 'Abstract' },
    { computed: true, label: 'Warnings', content: (data) => (duplicates.includes(data.doi) ? <strong>Duplicate</strong> : '') },
    {
      computed: true, label: 'Actions', content: (data) => (
        <div>
          <button type="button" onClick={() => handleDelete('queue', data)}>Delete</button>
          <br />
          <button type="button" onClick={() => alert('TODO')}>Mark Moderated</button>
        </div>
      )
    }
  ];

  return (
    <Container>
      <Link href="/">Return Home</Link>
      <br></br>
      <h1>Moderator View</h1>
      <h2>Articles in Queue Pending Moderation</h2>
      <SortableTable headers={headersList} data={queueData.articleData} />
      {queueData.articleData.length === 0 ? <strong>No Articles Needing Moderation</strong> : ''}
    </Container>
  );
};

export default Index;
