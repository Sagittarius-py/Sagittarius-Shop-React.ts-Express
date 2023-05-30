import React, { useState } from 'react';

interface ShippingOption {
  id: number;
  name: string;
  price: number;
}

const ShippingOptions: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<ShippingOption | null>(null);

  const shippingOptions: ShippingOption[] = [
    { id: 1, name: 'Standard Shipping', price: 9.99 },
    { id: 2, name: 'Express Shipping', price: 19.99 },
    { id: 3, name: 'Priority Shipping', price: 29.99 },
  ];

  const handleOptionSelect = (option: ShippingOption) => {
    setSelectedOption(option);
  };

  return (
    <div className="container mx-auto p-4 bg-zinc-200 rounded">
      <h1 className="text-xl font-semibold mb-4">Shipping Options</h1>

      <div className="flex flex-col gap-4  p-4">
        {shippingOptions.map((option) => (
          <div
            key={option.id}
            className={`flex items-center justify-between border rounded px-4 py-2 ${
              selectedOption?.id === option.id
                ? 'bg-blue-200'
                : 'bg-white hover:bg-gray-100'
            }`}
            onClick={() => handleOptionSelect(option)}
          >
            <span>{option.name}</span>
            <span>${option.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingOptions;