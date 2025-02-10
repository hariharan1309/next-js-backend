import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

function sum(a: number, b: number) {
  return a + b;
}

test("Adding 2+ 3 equals 5", () => {
  expect(sum(2, 3)).toBe(5);
  expect(sum(3, 6)).not.toBe(5);
});

test(" Object Checking", () => {
  const data = { one: 2 };
  data["two"] = 4;
  expect(data).toEqual({ one: 2, two: 4 });
});

test("Hariharan is a Loser", () => {
  expect("Loser").toMatch(/os/);
});
