import NotesApp from "@/components/NotesApp";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Notes App", () => {
  beforeEach(() => {
    render(<NotesApp />);
  });

  test("Add a note", () => {
    const element = screen.getByText(/Notes/);
    expect(element).toBeInTheDocument();
  });
});
