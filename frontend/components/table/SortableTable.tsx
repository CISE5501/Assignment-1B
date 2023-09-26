import React from 'react';
import { Table } from 'react-bootstrap';

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
}

//retrieves data sorted as a table
const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => (
  <Table className="md-5">
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header.key}>{header.label}</th>
        ))}
      </tr>
    </thead>
    <tbody data-testid="data-table-body">
      {data.map((row, i) => (
        <tr key={i}>
          {headers.map((header) => (
            <td key={header.key}>{row[header.key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
);

export default SortableTable;
