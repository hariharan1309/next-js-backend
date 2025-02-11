import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../page";

function sum(a: number, b: number) {
  return a + b;
}

test("Adding 2+ 3 equals 5", () => {
  expect(sum(2, 3)).toBe(5);
  expect(sum(3, 6)).not.toBe(5);
});

//  Before and After Operations

// beforeAll(() => { // This will run before all the test cases
// AfterAll(() => { // This will run after all the test cases
//   console.log("Before All");
// });

// beforeEach(() => { // This will run before each test cases
// afterEach(() => { // This will run after each test cases
//   console.log("Before Each");
// });

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

describe("The UI Cgecking", () => {
  beforeEach(() => {
    render(<Home />);
  }); // So that we can render the component before each test cases
  test("the Home Checkking", () => {
    // render(<Home />);
    expect(screen.getByText(/Loser/)).toBeInTheDocument();
  });
  test("Checking by Text Id", () => {
    // render(<Home />);
    const element = screen.getByTestId("homeId");
    expect(element.textContent).toMatch(/is/);
  });
});
