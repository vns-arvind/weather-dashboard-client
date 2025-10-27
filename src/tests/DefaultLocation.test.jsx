import { render, screen, fireEvent } from "@testing-library/react";
import DefaultLocation from "../components/DefaultLocation";

test("renders default city and button", () => {
  const mockSetDefault = jest.fn();
  render(<DefaultLocation city="Berlin" onSetDefault={mockSetDefault} />);
  expect(screen.getByText(/Berlin/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button"));
  expect(mockSetDefault).toHaveBeenCalled();
});
