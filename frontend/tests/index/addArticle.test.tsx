import { cleanup, fireEvent, getAllByRole, render, screen } from '@testing-library/react';
import ArticleSubmissionForm from '../../components/form/ArticleSubmissionForm';
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
    expect(inputs.length).toBe(11);
    inputs.forEach((element) => {
      //console.log(element.dataset.key);
      expect(element.value).toBe('');
    });
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
