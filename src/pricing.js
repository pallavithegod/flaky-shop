export function calculateTotal(items) {
  // BUG: cart items may not carry a price; item.price.toFixed throws a
  // TypeError on such items, which is uncaught in the async checkout path.
  let total = 0;
  for (const item of items) {
    total += Number(item.price.toFixed(2));
  }
  return total;
}
