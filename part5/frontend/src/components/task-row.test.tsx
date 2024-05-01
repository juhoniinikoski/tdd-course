import { fireEvent, render, screen } from "@testing-library/react";
import { vi, beforeEach, describe, it, expect } from "vitest";
import { TaskRow } from "./task-row";

const mockHandleArchive = vi.fn();
const mockHandleRename = vi.fn();
const mockHandleComplete = vi.fn();

const mockTask = { id: "test-id", title: "task1", completed: false, archived: false };
const mockTask2 = { id: "test-id", title: "task1", completed: false, archived: true };

describe("task input row", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockHandleArchive.mockReturnValue(() => Promise.resolve({ status: "ok" }));
    mockHandleRename.mockReturnValue(() => Promise.resolve({ status: "ok" }));
  });

  it("renders task item successfully", () => {
    render(
      <TaskRow
        task={mockTask}
        handleArchive={mockHandleArchive}
        handleRename={mockHandleRename}
        handleComplete={mockHandleComplete}
      />,
    );

    const item = screen.getByDisplayValue(mockTask.title);
    expect(item).not.toEqual(undefined);
  });

  it("calls handleArchive successfully", () => {
    render(
      <TaskRow
        task={mockTask}
        handleArchive={mockHandleArchive}
        handleRename={mockHandleRename}
        handleComplete={mockHandleComplete}
      />,
    );

    const button = screen.getByLabelText("archive-button");
    fireEvent.click(button);
    expect(mockHandleArchive).toBeCalledWith(mockTask.id);
  });

  it("allows users to edit task title successfully", () => {
    render(
      <TaskRow
        task={mockTask}
        handleArchive={mockHandleArchive}
        handleRename={mockHandleRename}
        handleComplete={mockHandleComplete}
      />,
    );

    const editButton = screen.getByLabelText("edit-button");
    fireEvent.click(editButton);

    expect(mockHandleRename).toBeCalledTimes(0);

    const newTitle = "new title";

    const input = screen.getByLabelText("title-input");
    fireEvent.change(input, { target: { value: newTitle } });

    const renameButton = screen.getByLabelText("rename-button");
    fireEvent.click(renameButton);

    expect(mockHandleRename).toBeCalledWith(mockTask.id, newTitle);
  });

  it("cannot set empty string as new title", () => {
    render(
      <TaskRow
        task={mockTask}
        handleArchive={mockHandleArchive}
        handleRename={mockHandleRename}
        handleComplete={mockHandleComplete}
      />,
    );

    const editButton = screen.getByLabelText("edit-button");
    fireEvent.click(editButton);

    expect(mockHandleRename).toBeCalledTimes(0);

    const newTitle = "";

    const input = screen.getByLabelText("title-input");
    fireEvent.change(input, { target: { value: newTitle } });

    const renameButton = screen.getByLabelText("rename-button");
    fireEvent.click(renameButton);

    expect(mockHandleRename).toBeCalledTimes(0);
  });

  it("shouldn't show action buttons if task is archived", () => {
    render(
      <TaskRow
        task={mockTask2}
        handleArchive={mockHandleArchive}
        handleRename={mockHandleRename}
        handleComplete={mockHandleComplete}
      />,
    );
    const actionButtonContainer = screen.queryByLabelText("task-row-button-container");
    expect(actionButtonContainer).toBeNull();
  });

  it("completes a task by pressing a circle", () => {
    render(
      <TaskRow
        task={mockTask}
        handleArchive={mockHandleArchive}
        handleRename={mockHandleRename}
        handleComplete={mockHandleComplete}
      />,
    );

    const completeButton = screen.getByLabelText("complete-button");
    fireEvent.click(completeButton);

    expect(mockHandleComplete).toBeCalledWith(mockTask.id);
  });
});
