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

const sampleFun = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello");
    }, 2000);
  });
};

test("Testing the async function testing", async () => {
  const resp = await sampleFun();
  expect(resp).toEqual("Hello");
});

// Combinng more Unit Tests

describe("This is the Combination of Multiple Unit Tests that it async", () => {
  test("Testing the async function testing", async () => {
    const resp = await sampleFun();
    expect(resp).toEqual("Hello");
  });
  test("Testing the async function testing", async () => {
    const resp = await sampleFun();
    expect(resp).not.toEqual("frbhrfrf");
  });
});
