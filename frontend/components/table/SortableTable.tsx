import React from 'react';
import { Table } from 'react-bootstrap';

export type ComputedRow = {
  computed: true;
  label: string;
  content: (rowData: any) => any;
};

export type DataRow = {
  label: string;
  key: string;
  displayAs?: (data: any) => any; // => Element|string
};

export type SortableTableHeader = ComputedRow | DataRow;

interface SortableTableProps {
  headers: SortableTableHeader[];
  data: any[];
}

//retrieves data sorted as a table
const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => (
  <Table className="md-5">
    <thead>
      <tr>
        {headers.map((header, j) => (
          <th key={'key' in header ? header.key : 'computed' + j}>
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody data-testid="data-table-body">
      {data.map((row, i) => (
        <tr key={i}>
          {headers.map((header, j) =>
            'computed' in header ? (
              <td key={'computed' + j}>{header.content(row)}</td>
            ) : (
              <td key={header.key}>
                {header.displayAs
                  ? header.displayAs(row[header.key])
                  : row[header.key]}
              </td>
            ),
          )}
        </tr>
      ))}
    </tbody>
  </Table>
);

export default SortableTable;
