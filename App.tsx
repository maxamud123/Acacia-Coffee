import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { OrderReceipt } from './components/OrderReceipt';
import { CartProvider } from './context/CartContext';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order-confirmation" element={<OrderReceipt />} />
      </Routes>
    </CartProvider>
  );
};

export default App;