import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./index";

describe("Button component", () => {
  //1. Verifica que el botón se renderiza con el texto correcto
  test("renders the button with correct text", () => {
    render(<Button text="Click Me" />);
    const button = screen.getByText(/Click Me/);
    expect(button).toBeInTheDocument();
  });

  //2. Verifica que el botón recibe y aplica correctamente las clases de variante y tamaño
  test("apllies correct variant and size classes", () => {
    render(<Button text="Test Button" variant="primary" size="medium" />);
    const button = screen.getByText(/Test Button/i);
    expect(button).toHaveClass("btn primary medium");
  });

  //3. Verifica que la función onClick se ejecute cunado se hace click
  test("calls onClick function on button click", () => {
    const mockCallback = jest.fn();
    render(<Button text="Test Button" onClick={mockCallback} />);
    const button = screen.getByText(/Test Button/i);
    fireEvent.click(button);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  //4. Verifica que el botón esté deshabilitado cuando el estado deshabilitado sea true
  test("disables the button when disabled prop is true", () => {
    render(<Button text="Test Button" disabled />);
    const button = screen.getByText(/Test Button/i);
    expect(button).toBeDisabled();
  });

  //5. Verifica que el botón tenga el texto y clase adicionales especificados en los props
  test("renders the button with additional props", () => {
    render(<Button text="Test Button" className="custom-class" />);
    const button = screen.getByText(/Test Button/i);
    expect(button).toHaveClass("btn custom-class");
  });
});
