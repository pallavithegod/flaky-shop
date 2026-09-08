import express from "express";
import { calculateTotal } from "./src/pricing.js";

const app = express();
const port = process.env.PORT || 3000;

const products = [
  { id: 1, name: "Mechanical Keyboard", price: 89.0 },
  { id: 2, name: "USB-C Dock", price: 129.5 },
  { id: 3, name: "4K Monitor", price: 349.99 },
];

// The demo cart is missing its price fields — checkout hits the planted bug
// in src/pricing.js and crashes the process.
const cart = [{ id: 1, name: "Mechanical Keyboard" }];

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/", (_request, response) => {
  const rows = products
    .map((p) => `<li>${p.name} — $${p.price.toFixed(2)}</li>`)
    .join("");
  response.send(`<!doctype html>
    <html><head><title>Flaky Shop</title></head>
    <body style="font-family: sans-serif; max-width: 40rem; margin: 3rem auto;">
      <h1>Flaky Shop</h1>
      <p>A demo storefront monitored by RecallOps.</p>
      <ul>${rows}</ul>
      <form action="/checkout" method="get">
        <button style="padding: 0.6rem 1.4rem; font-size: 1rem;">Checkout (crashes the app)</button>
      </form>
    </body></html>`);
});

app.get("/checkout", (_request, response) => {
  // Pricing runs on the next tick (as async order processing would), so the
  // planted TypeError escapes Express error handling and kills the process.
  setImmediate(() => {
    const total = calculateTotal(cart);
    response.json({ total });
  });
});

app.listen(port, () => {
  console.log(`flaky-shop listening on http://localhost:${port}`);
});
