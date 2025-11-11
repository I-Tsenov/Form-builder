import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, vi } from "vitest";
import FormBuilder from "./FormBuilder";

vi.mock("../../services/MockFieldService", () => ({
  default: {
    saveField: vi.fn().mockResolvedValue(true),
  },
}));

vi.mock("../../utils/sanitizeInput", () => ({
  sanitizeInput: (val) => val.trim(), // not original sanitization
}));

describe("FormBuilder", () => {
  beforeEach(() => {
    render(<FormBuilder />);
    fireEvent.change(screen.getByPlaceholderText(/select region/i), {
      target: { value: "My Label" },
    }); //required field for submission
  });

  test("renders title and logo", () => {
    expect(screen.getByText(/form builder/i)).toBeInTheDocument();
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });

  test("updates label input", () => {
    const input = screen.getByPlaceholderText(/select region/i);
    expect(input.value).toBe("My Label");
  });

  test("switch toggles displayAlpha", () => {
    const switchEl = screen.getByRole("switch");

    expect(switchEl).toHaveAttribute("aria-checked", "false");
    fireEvent.click(switchEl);
    expect(switchEl).toHaveAttribute("aria-checked", "true");
    fireEvent.keyDown(switchEl, { key: "Enter", code: "Enter" });
    expect(switchEl).toHaveAttribute("aria-checked", "false");
  });

  test("reset button clears values", () => {
    const input = screen.getByPlaceholderText(/select region/i);
    fireEvent.change(input, { target: { value: "Temp" } });
    expect(input.value).toBe("Temp");

    fireEvent.click(screen.getByRole("button", { name: /reset/i }));
    expect(input.value).toBe("");
  });

  test("save button calls FieldService.saveField with sanitized payload", async () => {
    const { default: FieldService } = await import(
      "../../services/MockFieldService"
    );

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    waitFor(() => {
      expect(FieldService.saveField).toHaveBeenCalledWith(
        expect.objectContaining({
          label: "My Label",
        }),
        expect.any(Function)
      );
    });
  });

  test("shows error when default is missing and choices are already at max", async () => {
    const choicesInput = screen.getByPlaceholderText(/type a choice/i);

    for (let i = 0; i < 50; i++) {
      fireEvent.change(choicesInput, { target: { value: `Choice${i}` } });
      fireEvent.keyDown(choicesInput, { key: "Enter", code: "Enter" });
    }

    //add one more through default field - error trigger (51st element)
    const defaultInput = screen.getByPlaceholderText(/enter default/i);
    fireEvent.change(defaultInput, { target: { value: "NotInChoices" } });

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    const errorEl = await screen.findByRole("alert");
    expect(errorEl).toBeInTheDocument();
    expect(errorEl).toHaveTextContent(/50 choices/i);
  });

  test("auto-adds default to choices when missing and under max, without error", async () => {
    const choicesInput = screen.getByPlaceholderText(/type a choice/i);
    const defaultInput = screen.getByPlaceholderText(/enter default/i);

    for (let i = 0; i < 3; i++) {
      fireEvent.change(choicesInput, { target: { value: `Choice${i}` } });
      fireEvent.keyDown(choicesInput, { key: "Enter", code: "Enter" });
    }
    fireEvent.change(defaultInput, { target: { value: "tokyo" } });

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    waitFor(() => {
      expect(screen.queryByRole("alert")).toBeNull();
      const choiceTexts = screen
        .getAllByRole("listitem")
        .map((li) => li.querySelector("span").textContent);
      expect(choiceTexts).toContain("tokyo");
    });
  });
});
