export function getCartItemId(item) {
  if (typeof item.cartId === 'string' && item.cartId.startsWith('donation-')) return item.cartId;
  return `${item.id}::${item.selectedColor || ''}::${item.selectedSize || ''}`;
}

export function normalizeCartItem(item) {
  return { ...item, cartId: getCartItemId(item) };
}

export function addCartItem(cart, item) {
  const cartId = getCartItemId(item);
  const existing = cart.find((entry) => getCartItemId(entry) === cartId);
  if (existing) {
    return cart.map((entry) => getCartItemId(entry) === cartId
      ? { ...entry, qty: (entry.qty || 1) + 1 }
      : entry);
  }
  return [...cart, { ...item, cartId, qty: 1 }];
}
