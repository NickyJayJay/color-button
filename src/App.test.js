import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has correct initial color and updates when clicked', () => {
	render(<App />);

	// find an element with a role of button and text of 'Change to blue'
	const colorButton = screen.getByRole('button', { name: 'Change to blue' });

	// expect the background color to be red
	expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

	// click button
	fireEvent.click(colorButton);

	// expect the background color to be blue
	expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });

	// expect the button text to be 'Change to red'
	expect(colorButton).toHaveTextContent('Change to red');
});

test('initial conditions', () => {
	render(<App />);

	// check that the button starts out enabled
	const colorButton = screen.getByRole('button', { name: 'Change to blue' });
	expect(colorButton).toBeEnabled();

	// check that the checkbox start out unchecked
	const checkbox = screen.getByRole('checkbox');
	expect(checkbox).not.toBeChecked();
});

test('Button is disabled when checkbox is checked', () => {
	render(<App />);
	const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
	const colorButton = screen.getByRole('button');

	fireEvent.click(checkbox);
	expect(colorButton).toBeDisabled();

	fireEvent.click(checkbox);
	expect(checkbox).toBeEnabled();
});

test('Check that button is gray when disabled', () => {
	render(<App />);
	const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
	const colorButton = screen.getByRole('button', { name: 'Change to blue' });

	// check if button toggles between gray and red when checkbox is disabled and enabled respectively
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle('background-color: red');

	// check if button becomes disabled and gray when clicked
	fireEvent.click(colorButton);
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

	// check if button is blue when clicking on it after it's been enabled
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });
});
