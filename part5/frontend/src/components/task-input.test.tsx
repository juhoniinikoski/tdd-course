import { beforeEach, vi, describe, it, expect } from "vitest";
import { TaskInput } from "./task-input";
import { render, screen, fireEvent } from "@testing-library/react";

const mockHandleSubmit = vi.fn();

describe("task input", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockHandleSubmit.mockReturnValue(() => Promise.resolve({ status: "ok" }));
  });

  it("persists the value to state correctly", () => {
    render(<TaskInput handleSubmit={mockHandleSubmit} />);

    const input: HTMLInputElement = screen.getByLabelText("task-input");
    fireEvent.change(input, { target: { value: "new task" } });
    expect(input.value).toBe("new task");
  });

  it("call handle submit with correct values", () => {
    render(<TaskInput handleSubmit={mockHandleSubmit} />);

    const input: HTMLInputElement = screen.getByLabelText("task-input");
    const submitButton: HTMLButtonElement = screen.getByLabelText("task-submit-button");

    fireEvent.change(input, { target: { value: "new task 2" } });
    fireEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalledWith("new task 2");
  });

  it("should disable the submit button if input is empty", () => {
    render(<TaskInput handleSubmit={mockHandleSubmit} />);

    const input: HTMLInputElement = screen.getByLabelText("task-input");
    fireEvent.change(input, { target: { value: "" } });

    const submitButton: HTMLButtonElement = screen.getByLabelText("task-submit-button");
    expect(submitButton.disabled).toBe(true);
    expect(mockHandleSubmit).toHaveBeenCalledTimes(0);
  });
});
