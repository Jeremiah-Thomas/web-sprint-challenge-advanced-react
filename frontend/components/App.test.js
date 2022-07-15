// Write your tests here
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import AppFunctional from "./AppFunctional";

test("Make sure coordinates are showing up", () => {
  render(<AppFunctional />);
  const coords = screen.getByText(/coordinates/i);
  expect(coords).toBeInTheDocument();
});

test("Make sure steps counter is showing up", () => {
  render(<AppFunctional />);
  const steps = screen.getByText(/you moved/i);
  expect(steps).toBeInTheDocument();
});

test("Make sure grid is showing up", () => {
  render(<AppFunctional />);

  const grid = screen.getByTestId("grid");
  expect(grid).toBeInTheDocument();
});

test("Make sure button are showing up", () => {
  render(<AppFunctional />);

  const leftBtn = screen.getByText(/left/i);
  const upBtn = screen.getByText(/up/i);
  const rightBtn = screen.getByText(/right/i);
  const downBtn = screen.getByText(/down/i);
  const resetBtn = screen.getByText(/reset/i);
  const submitBtn = screen.getByTestId("submit");

  expect(leftBtn).toBeInTheDocument();
  expect(upBtn).toBeInTheDocument();
  expect(rightBtn).toBeInTheDocument();
  expect(downBtn).toBeInTheDocument();
  expect(resetBtn).toBeInTheDocument();
  expect(submitBtn).toBeInTheDocument();
});

test("Make sure the email input can be typed in", async () => {
  render(<AppFunctional />);

  const emailInput = screen.getByTestId("email");
  await userEvent.type(emailInput, "my@my.com");

  expect(emailInput).toHaveValue("my@my.com");
});
