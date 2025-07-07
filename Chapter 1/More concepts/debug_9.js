function calculateTotal(products) {
    let total = 0
    products.forEach((product) => {
      total += product.quantity * product.price
    })
    return total
  }
  
  const productsList = [
    { name: 'Shoes', price: 50, quantity: 2 },
    { name: 'Hat', price: 25, quantity: 1 },
    { name: 'Gloves', price: 30, quantity: 2 },
  ]

  // vs debugging
  function printTotalValue(value){
    console.log(value);
  }
  // expected result = 100+25+60=185
  const grandTotal = calculateTotal(productsList);
  printTotalValue(grandTotal);
  //console.log('Grand Total:', grandTotal)
  
//  node inspect debug_9.js --> starts the debuging
// setBreakpoint('debug_9.js',4)

// watch('product')
// cont