// n = CSs (< 1.000)
// m = Customers (< 1.000.00)
// t = abstenções (<= 1)
// n.score = (< 10.000)
// m.score = (< 100.000)
// t = n/2

const CustomerSuccessBalancing = require("./cs_balancing");

const toScored = (score, key) => ({ id: key + 1, score });

describe("CustomerSuccessBalancingTests", () => {
  const scenariums = [
    [
      "test_scenario_one", // description
      [
        // customerSuccesses
        { id: 1, score: 60 },
        { id: 2, score: 20 },
        { id: 3, score: 95 },
        { id: 4, score: 75 },
      ],
      [
        // customers
        { id: 1, score: 90 },
        { id: 2, score: 20 },
        { id: 3, score: 70 },
        { id: 4, score: 40 },
        { id: 5, score: 60 },
        { id: 6, score: 10 },
      ],
      // away customerSuccesses
      [2, 4],
      // expected to be
      1,
    ],
    [
      "test_scenario_two", // description
      // customerSuccesses
      [11, 21, 31, 3, 4, 5].map(toScored),
      // customers
      [10, 10, 10, 20, 20, 30, 30, 30, 20, 60].map(toScored),
      // away customerSuccesses
      [],
      // expected to be
      0,
    ],
    [
      "test_scenario_three", // description
      // customerSuccesses
      Array.from({ length: 1000 }, (v, k) => (k === 998 ? 100 : 0)).map(
        toScored
      ),
      // customers
      Array.from({ length: 10000 }, (v, k) => 10).map(toScored),
      // away customerSuccesses
      [1000],
      // expected to be
      { timeout: 999 },
    ],
    [
      "test_scenario_four", // description
      // customerSuccesses
      [1, 2, 3, 4, 5, 6].map(toScored),
      // customers
      [10, 10, 10, 20, 20, 30, 30, 30, 20, 60].map(toScored),
      // away customerSuccesses
      [],
      // expected to be
      0,
    ],
    [
      "test_scenario_five", // description
      // customerSuccesses
      [100, 2, 3, 3, 4, 5].map(toScored),
      // customers
      [10, 10, 10, 20, 20, 30, 30, 30, 20, 60].map(toScored),
      // away customerSuccesses
      [],
      // expected to be
      1,
    ],
    [
      "test_scenario_six", // description
      // customerSuccesses
      [100, 99, 88, 3, 4, 5].map(toScored),
      // customers
      [10, 10, 10, 20, 20, 30, 30, 30, 20, 60].map(toScored),
      // away customerSuccesses
      [1, 3, 2],
      // expected to be
      0,
    ],
    [
      "test_scenario_seven", // description
      // customerSuccesses
      [100, 99, 88, 3, 4, 5].map(toScored),
      // customers
      [10, 10, 10, 20, 20, 30, 30, 30, 20, 60].map(toScored),
      // away customerSuccesses
      [4, 5, 6],
      // expected to be
      3,
    ],
  ];
  test.each(scenariums)("%s", (scenario, css, customers, away, expected) => {
    if (!expected.timeout)
      return expect(CustomerSuccessBalancing(css, customers, away)).toBe(
        expected
      );

    const t0 = performance.now();
    const result = CustomerSuccessBalancing(css, customers, away);
    const t1 = performance.now();
    expect(t1 - t0).toBeLessThan(1000);
    expect(result).toBe(999);
  });
});
