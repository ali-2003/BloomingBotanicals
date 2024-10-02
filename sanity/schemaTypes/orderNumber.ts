// schemas/orderNumber.js
export default {
    name: 'orderNumber',
    title: 'Order Number',
    type: 'document',
    fields: [
      {
        name: 'currentOrderNumber',
        title: 'Current Order Number',
        type: 'number',
        options: {
          min: 1, // You can set a minimum value if needed
        },
      },
    ],
  };
  