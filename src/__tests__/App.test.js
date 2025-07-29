import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import App from "../App";

describe("Pizza Ordering App", () => {
  // Pepperoni checkbox tests
  test("checkbox is initially unchecked", () => {
    render(<App />);
    const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
    expect(addPepperoni).not.toBeChecked();
  });

  test("checkbox appears as checked when user clicks it", async () => {
    const user = userEvent.setup();
    render(<App />);
    const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
    
    await user.click(addPepperoni);
    expect(addPepperoni).toBeChecked();
  });

  test("checkbox appears as unchecked when user clicks a second time", async () => {
    const user = userEvent.setup();
    render(<App />);
    const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
    
    await user.click(addPepperoni);
    expect(addPepperoni).toBeChecked();
    
    await user.click(addPepperoni);
    expect(addPepperoni).not.toBeChecked();
  });

  // Size selection tests
  test("size select element initially displays 'Small'", () => {
    render(<App />);
    const selectSize = screen.getByLabelText(/select size/i);
    expect(selectSize).toHaveDisplayValue("Small");
  });

  test("selecting size updates the dropdown display", async () => {
    const user = userEvent.setup();
    render(<App />);
    const selectSize = screen.getByLabelText(/select size/i);
    
    await user.selectOptions(selectSize, "Medium");
    expect(selectSize).toHaveDisplayValue("Medium");
    
    await user.selectOptions(selectSize, "Large");
    expect(selectSize).toHaveDisplayValue("Large");
  });

  // Selection display tests
  test("selection text initially displays 'small cheese'", () => {
    render(<App />);
    expect(screen.getByText(/small cheese/i)).toBeInTheDocument();
  });

  test("selection text updates when options change", async () => {
    const user = userEvent.setup();
    render(<App />);
    const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
    const selectSize = screen.getByLabelText(/select size/i);
    
    await user.click(addPepperoni);
    expect(screen.getByText(/small pepperoni/i)).toBeInTheDocument();
    
    await user.selectOptions(selectSize, "Large");
    expect(screen.getByText(/large pepperoni/i)).toBeInTheDocument();
  });

  // Contact info tests
  test("contact input has email placeholder", () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
  });

  test("contact input updates with user typing", async () => {
    const user = userEvent.setup();
    render(<App />);
    const contactInput = screen.getByLabelText(/email address/i);
    
    await user.type(contactInput, "test@example.com");
    expect(contactInput).toHaveValue("test@example.com");
  });

  // Order submission tests
  test("submit button exists", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: /submit order/i })).toBeInTheDocument();
  });

  test("submitting order shows confirmation", async () => {
    const user = userEvent.setup();
    render(<App />);
    const submitButton = screen.getByRole("button", { name: /submit order/i });
    
    await user.click(submitButton);
    expect(screen.getByText(/thanks for your order/i)).toBeInTheDocument();
  });
});