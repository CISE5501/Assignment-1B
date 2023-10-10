import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import fieldnames from '../table/fieldNames.json';
import {useCallback} from 'react';

//not a fan of this code either, I was just getting desperate
type SortKeys = keyof fields
type SortOrder = 'asc' | 'desc';

type fields = typeof fieldnames

export type ComputedRow<T> = {
  computed: true;
  label: string;
  content: (rowData: T) => React.JSX.Element | string;
};

export type DataRow<T> = {
  label: string;
  key: keyof T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  displayAs?: (data: any) => React.JSX.Element | string;
};

export type SortableTableHeader<T> = ComputedRow<T> | DataRow<T>;

interface SortableTableProps<T> {
  headers: SortableTableHeader<T>[];
  data: T[];
}

//for sorting the table, using any for table data to get rid of an error
//not good code, was getting desperate
function SortData({tableData, sortKey, reverse}: {tableData: any, sortKey: SortKeys, reverse: boolean})
{
  if(!sortKey) return tableData

  const sortedData = tableData.sort((a, b) =>{
    return a[sortKey] > b[sortKey] ? 1 : -1
  }) 

  if(reverse)
  {
    return sortedData.reverse()
  }

  return tableData
}

//retrieves data sorted as a table
function SortableTable  <T,>({ headers, data }: SortableTableProps<T>) {

  const [sortKey, setSortKey] = useState<SortKeys>('Title'); 
  const [SortOrder, setSortOrder] = useState<SortOrder>('asc'); 

  const sortedData = useCallback(() => 
    SortData({tableData: data, sortKey, reverse: SortOrder === 'desc'}), 
    [data, sortKey, SortOrder]
    );

  return (<Table className="md-5">
    <thead>
      <tr>
        {headers.map((header, j) => (
          <th key={'key' in header ? header.key.toString() : 'computed' + j}>{header.label}</th>
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
              <td key={header.key.toString()}>
                {header.displayAs ? (
                  header.displayAs(row[header.key])
                ) : (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  <span>{row[header.key] as any}</span>
                )}
              </td>
            ),
          )}
        </tr>
      ))}
    </tbody>
  </Table>)
}


export default SortableTable;
