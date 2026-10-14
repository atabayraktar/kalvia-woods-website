// Tiny event bridge so any CTA (homepage banner, the /urunler custom-order card) can open the
// one <CustomOrderModal /> mounted in _app.jsx without prop drilling or a context provider.
export const CUSTOM_ORDER_EVENT = 'kalvia:custom-order';

export function openCustomOrder() {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent(CUSTOM_ORDER_EVENT));
}
