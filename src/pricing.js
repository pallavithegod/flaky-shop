export function calculateTotal(items) {
  // Cart items may not carry a price; treat missing prices as 0 so checkout
  // cannot crash the process while calculating totals.
  let total = 0;
  for (const item of items) {
    const price = Number(item?.price ?? 0);
    total += Number((Number.isFinite(price) ? price : 0).toFixed(2));
  }
  return total;
}
