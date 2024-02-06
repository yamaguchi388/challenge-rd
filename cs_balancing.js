module.exports = (customer_success, customers, customer_success_away) => {
  let unattendend = new Set(customers);

  const CSes = customer_success
    .filter(({ id }) => !customer_success_away.includes(id))
    .sort((a, b) => a.score - b.score)
    .map((cs) => {
      let customersCount = 0;
      unattendend.forEach((customer) => {
        if (customer.score <= cs.score) {
          unattendend.delete(customer);
          customersCount++;
        }
      });
      return {
        ...cs,
        customersCount,
      };
    })
    .sort((a, b) => b.customersCount - a.customersCount);

  const first = CSes[0];
  const second = CSes[1];
  console.log(first, second);

  return first.customersCount === second.customersCount ? 0 : first.id;
};
