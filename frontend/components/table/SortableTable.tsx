import React, { useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import fieldnames from '../table/fieldNames.json';
import {useCallback} from 'react';

//Needed for setting the 
//not a fan of this code either, I was just getting desperate
type SortKeys = keyof fields
type SortOrder = 'asc' | 'desc';

//Just to get a hold of the field keys and set the fields type to store one of any of the different keys
type fields = typeof fieldnames

//props
export type ComputedRow<T> = {
  computed: true;
  label: string;
  content: (rowData: T) => React.JSX.Element | string;
};

export type DataRow<T> = {
  label: string;
  key: keyof T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  displayAs?: (data: any, row: T) => React.JSX.Element | string;
};

export type SortableTableHeader<T> = ComputedRow<T> | DataRow<T>;

interface SortableTableProps<T> {
  headers: SortableTableHeader<T>[];
  data: T[];
}

//for sorting the table, the idea is that it would take in a key to sort by and whether it should be in ascending or descending order. 
//not good code, was getting desperate

//was using these for reference/holding onto scrapped ideas:
//function SortableTable  <T,>({ headers, data }: SortableTableProps<T>)
//function SortData<T, SortableTableHeader>({tableData, sortKey, reverse}: {tableData: T[], sortKey: SortKeys, reverse: boolean})
//function SortData<T>({headers, data}: SortableTableProps<T>, {sortKey, reverse}: { sortKey: SortKeys, reverse: boolean})
function SortData<T>({data, sortKey, reverse}: {data: T[], sortKey: SortKeys, reverse: boolean}) //Liam
{
  if(!sortKey) return data
  //why can't something just work

  //I know this is just gibberish at this point, 
  //I was just throwing things at the wall
  const sortedData = data.sort((a) => {
    return a > sortKey ? 1 : -1 
  })

  if(reverse)
  {
    return sortedData.reverse()
  }

  return sortedData
}

//retrieves data sorted as a table, I had to change to a function because I couldn't get the right parameters with a const
function SortableTable  <T,>({ headers, data }: SortableTableProps<T>) {

  //selecting which state to use, was going to be dynamic
  const [sortKey, setSortKey] = useState<SortKeys>('Title'); 
  const [SortOrder, setSortOrder] = useState<SortOrder>('asc'); 

  //calling the sort function
  const sortedData = useCallback(() => 
    SortData({data, sortKey, reverse: SortOrder === 'desc'}), 
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
      {//was originally going to change data.map to something like this: sortedData.map((row, i) => ( 
      //Didn't go through with becase I couldn't get the output correct on the sortdata function //Liam 
      }
      {data.map((row, i) => (
        <tr key={i}>
          {headers.map((header, j) =>
            'computed' in header ? (
              <td data-testid={header.label.toString()} key={'computed' + j}>
                {header.content(row)}
              </td>
            ) : (
              <td data-testid={header.label.toString()} key={header.key.toString()}>
                {header.displayAs ? (
                  header.displayAs(row[header.key], row)
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
