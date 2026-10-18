import assert from 'node:assert/strict';
import test from 'node:test';
import { addCartItem, normalizeCartItem } from '../src/services/cart.js';

const item = (selectedColor, selectedSize) => ({
  id: 12,
  selectedColor,
  selectedSize,
  qty: 1,
});

test('same product and variants increase the existing quantity', () => {
  const cart = addCartItem([], item('Navy', 'M'));
  const updated = addCartItem(cart, item('Navy', 'M'));

  assert.equal(updated.length, 1);
  assert.equal(updated[0].qty, 2);
});

test('different colors or sizes remain separate cart entries', () => {
  const cart = addCartItem([], item('Navy', 'M'));
  const withDifferentColor = addCartItem(cart, item('Black', 'M'));
  const withDifferentSize = addCartItem(withDifferentColor, item('Navy', 'L'));

  assert.equal(withDifferentSize.length, 3);
  assert.deepEqual(withDifferentSize.map(({ selectedColor, selectedSize }) => [selectedColor, selectedSize]), [
    ['Navy', 'M'],
    ['Black', 'M'],
    ['Navy', 'L'],
  ]);
});

test('legacy cart entries are normalized using their selected variants', () => {
  const normalized = normalizeCartItem({ ...item('Green', 'L'), cartId: 12 });
  assert.equal(normalized.cartId, '12::Green::L');
});
