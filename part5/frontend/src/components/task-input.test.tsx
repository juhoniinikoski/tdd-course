import { beforeEach, vi, describe, it, expect } from "vitest";
import { TaskInput } from "./task-input";
import { render, screen, fireEvent } from "@testing-library/react";

const mockHandleSubmit = vi.fn();
const mockHandleArchiveCompleted = vi.fn();

const mockTask = { id: "test-id", title: "task1", completed: true, archived: false };
const mockTask2 = { id: "test-id", title: "task1", completed: false, archived: true };

const allTasks = [mockTask, mockTask2];

describe("task input", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockHandleSubmit.mockReturnValue(() => Promise.resolve({ status: "ok" }));
  });

  it("persists the value to state correctly", () => {
    render(
      <TaskInput
        allTasks={allTasks}
        handleSubmit={mockHandleSubmit}
        handleArchiveCompleted={mockHandleArchiveCompleted}
      />,
    );

    const input: HTMLInputElement = screen.getByLabelText("task-input");
    fireEvent.change(input, { target: { value: "new task" } });
    expect(input.value).toBe("new task");
  });

  it("calls handle submit with correct values", () => {
    render(
      <TaskInput
        allTasks={allTasks}
        handleSubmit={mockHandleSubmit}
        handleArchiveCompleted={mockHandleArchiveCompleted}
      />,
    );

    const input: HTMLInputElement = screen.getByLabelText("task-input");
    const submitButton: HTMLButtonElement = screen.getByLabelText("task-submit-button");

    fireEvent.change(input, { target: { value: "new task 2" } });
    fireEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalledWith("new task 2");
  });

  it("disables the submit button if input is empty", () => {
    render(
      <TaskInput
        allTasks={allTasks}
        handleSubmit={mockHandleSubmit}
        handleArchiveCompleted={mockHandleArchiveCompleted}
      />,
    );

    const input: HTMLInputElement = screen.getByLabelText("task-input");
    fireEvent.change(input, { target: { value: "" } });

    const submitButton: HTMLButtonElement = screen.getByLabelText("task-submit-button");
    expect(submitButton.disabled).toBe(true);

    fireEvent.click(submitButton);
    expect(mockHandleSubmit).toHaveBeenCalledTimes(0);
  });

  it("disables the archive all button if there are no active tasks", () => {
    render(
      <TaskInput allTasks={[]} handleSubmit={mockHandleSubmit} handleArchiveCompleted={mockHandleArchiveCompleted} />,
    );

    const button: HTMLButtonElement = screen.getByLabelText("archive-completed-button");

    fireEvent.click(button);
    expect(button.disabled).toBe(true);
    expect(mockHandleArchiveCompleted).toHaveBeenCalledTimes(0);
  });

  it("archives all completed tasks", () => {
    render(
      <TaskInput
        allTasks={allTasks}
        handleSubmit={mockHandleSubmit}
        handleArchiveCompleted={mockHandleArchiveCompleted}
      />,
    );

    const button: HTMLButtonElement = screen.getByLabelText("archive-completed-button");

    fireEvent.click(button);

    expect(mockHandleArchiveCompleted).toHaveBeenCalledTimes(1);
  });
});
