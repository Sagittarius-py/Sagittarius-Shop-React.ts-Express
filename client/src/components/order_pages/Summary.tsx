import ShippingOptions from "./ShippingOptions"

const Summary = () => {

    return(
        <div className="bg-zinc-800 min-h-screen pt-24">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-semibold text-center mb-8 text-zinc-200">Order Summary</h1>
  
          <div className="bg-zinc-200 rounded shadow">
            <div className="px-6 py-4">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
  
              <div className="flex justify-between mb-4">
                <span className="font-medium">Order ID:</span>
                <span>1234567890</span>
              </div>
  
              <div className="flex justify-between mb-4">
                <span className="font-medium">Date:</span>
                <span>May 22, 2023</span>
              </div>
  
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total Amount:</span>
                <span>$99.99</span>
              </div>
            </div>
          </div>
  
          <div className="mt-8">
  
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="bg-zinc-200 rounded shadow px-6 py-4 w-full mb-2 lg:w-2/5">
              <h2 className="text-2xl font-semibold mb-4 ">Shipping Address</h2>
                <p>John Doe</p>
                <p>123 Main Street</p>
                <p>New York, NY 12345</p>
              </div>
              <div className="lg:w-2/5 w-full">
                <ShippingOptions />
              </div>
            </div>
          </div>
  
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-zinc-200" >Items</h2>
  
            <div className="bg-zinc-200 rounded shadow">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <div className="flex items-center">
                  <img className="w-12 h-12 object-contain mr-4" src="item1.jpg" alt="Item 1" />
                  <span>Item 1</span>
                  <span className="ml-16">Amount</span>
                </div>
                <span>$19.99</span>
              </div>
  
              
            </div>
          </div>
        </div>
      </div>
    )
}

export default Summary