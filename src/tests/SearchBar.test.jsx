import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

test("renders input and button", () => {
  render(<SearchBar onSearch={() => {}} />);
  expect(screen.getByPlaceholderText("Enter city...")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("calls onSearch with input value", () => {
  const mockSearch = jest.fn();
  render(<SearchBar onSearch={mockSearch} />);
  fireEvent.change(screen.getByPlaceholderText("Enter city..."), {
    target: { value: "Paris" },
  });
  fireEvent.submit(screen.getByRole("button"));
  expect(mockSearch).toHaveBeenCalledWith("Paris");
});
