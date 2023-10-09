import { cleanup, fireEvent, getAllByRole, render, screen } from '@testing-library/react';
import ArticleSubmissionForm from '../../components/ArticleSubmissionForm';
import '@testing-library/jest-dom';

function renderPage() {
  return render(<ArticleSubmissionForm />);
}

afterEach(cleanup);

describe('Testing initial rendering for article submission form', () => {
  test('Test 1: form is rendered and all the input elements are blank', async () => {
    renderPage();
    const form = screen.getByRole('form', { name: 'form' });
    const inputs = form.querySelectorAll('input');
    expect((inputs.length)).toBe(11);
    inputs.forEach(element => {
      //console.log(element.dataset.key);
      expect((element.value)).toBe('');
    });
  });
  test('Test 2: form fields accept inputs', async () => {
    renderPage();
    const mockChange = jest.fn();
    const form = screen.getByRole('form', { name: 'form' });
    const inputs = form.querySelectorAll('input');
    inputs.forEach(onchange = mockChange);
    expect(mockChange).toBeCalledTimes(11);
  });
});

describe('Testing form submission', () => {
  test('Test 1: when user clicks on the submit button the handleSubmit method is called', async () => {
    const handleOnSubmitMock = jest.fn();
    renderPage();
    screen.getByRole('form').onsubmit = handleOnSubmitMock;
    fireEvent.submit(screen.getByRole('form'));
    expect(handleOnSubmitMock).toBeCalled();
  });
});

describe('Testing form validation: Title', () => {
  test('Test 1: trying to submit while empty', async () => {
    const handleOnSubmitMock = jest.fn();
    renderPage();
    screen.getByTestId(/title/i);
  });
  test('Test 2: trying to submit non-empty title', async () => {
    
  });
});

describe('Testing form validation: Authors', () => {
  //needs to have first name and last name
  //add user button should create new input field
  //cannot be blank
});

describe('Testing form validation: Date', () => {
  //cannot be blank
});

describe('Testing form validation: DOI', () => {
  //cannot be blank
  //must follow regex format
  test('Test 1: DOI follows correct format (xxxxx / xxxxxxi)', async () => { });
});

describe('Testing form validation: Volume', () => {
  //cannot be negative
  //cannot be blank
  //both inputs must only accept numeric values
});

describe('Testing form validation: Issue', () => {
  //cannot be negative
  //cannot be blank
  //both inputs must only accept numeric values
});

describe('Testing form validation: Page Range', () => {
  //starting number cannot be bigger than ending number
  //both numbers need to be > 0
  //both inputs must only accept numeric values
});

