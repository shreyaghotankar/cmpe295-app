import { isElement, isElementOfType, renderIntoDocument } from 'react-dom/test-utils';
import App from './App';

test('renders learn react link', () => {
     renderIntoDocument(<App />);
     expect(isElement(<App />)).toBe(true);
     expect(isElementOfType(<App />, App)).toBe(true);
});
