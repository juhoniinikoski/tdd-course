import { fireEvent, render, screen } from "@testing-library/react";
import { vi, beforeEach, describe, it, expect } from "vitest";
import { TaskRow } from "./task-row";

const mockHandleArchive = vi.fn();
const mockHandleRename = vi.fn();

const mockTask = { id: "test-id", title: "task1", completed: false, archived: false };

describe("task input row", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockHandleArchive.mockReturnValue(() => Promise.resolve({ status: "ok" }));
    mockHandleRename.mockReturnValue(() => Promise.resolve({ status: "ok" }));
  });

  it("renders task item successfully", () => {
    render(<TaskRow task={mockTask} handleArchive={mockHandleArchive} handleRename={mockHandleRename} />);

    const item = screen.getByText(mockTask.title);
    expect(item).not.toEqual(undefined);
  });

  it("calls handleArchive successfully", () => {
    render(<TaskRow task={mockTask} handleArchive={mockHandleArchive} handleRename={mockHandleRename} />);

    const button = screen.getByLabelText("archive-button");
    fireEvent.click(button);
    expect(mockHandleArchive).toBeCalledWith(mockTask.id);
  });
  it.todo("allows users to edit task title successfully");
});
