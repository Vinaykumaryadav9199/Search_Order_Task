if (data !== null && data.length > 0) {
    var order_content = "";
    var PaymentStatus = "Prepaid"
    var aboutPayment = "Paid"
    var trasid ="178423829"
    data.forEach(order => {
        if (order.PaymentStatus == "payment-awaiting")
        {
                PaymentStatus ="Not Paid"
                aboutPayment ="payment-awaiting"
                trasid=""

        }
        order_content += `
            <div id="searchResult">
                <div id="container1">
                   <div>
                        <p>Order Date</p>
                        <p>${order.Date}</p>
                   </div>
                   <div>
                        <p>${trasid}</p>
                        <p>${PaymentStatus}</p>
                   </div>
                   <div>
                        <p>Buyer Details</p>
                        <p>${order.customer_name}</p>
                        <p>${order.customer_address}</p>
                        <p>Email: ${order.customer_email}</p>
                        <span>Phone: ${order.customer_phone} </span>
                        <span>Pincode: ${order.customer_phone} </span>
                   </div>
                   <div>
                        <p>${aboutPayment}</p>
                        <p>Total: ${order.Price}</p>
                   </div>
                   <div>
                       <button id="track">TRACK</button>
                   </div>
                   <div>
                       <a href="hello">Generate invoice</a>
                   </div>
                </div>
                <div>
                    <div id="Container2">
                            <div id="Image_div">
                             <img src=${order.ProductImage} alt="Product Image" id="image"/>
                            </div>
                            <div id ="Details">

                                <div id ="product_name_div">
                                <a href="hello">${order.ProductName}</a>
                                </div>
                                <div id ="product_dis">
                                         <div>
                                         <p>Model: ${order.Model}</p>
                                         <p>Price:Rs. ${order.Price}</p>
                                         <p>Date: ${order.Date}</p>
                                         <p>Discount: ${order.Discount}</p>
                                         </div>
                                         <div>
                                         <p>Qty: ${order.Qty}</p>
                                         <p>Delivery Charge: ${order.DeliveryCharge}</p>
                                         <p>Status: ${aboutPayment}</p>
                                        
                                         </div>
                                </div>
                            </div>

                    </div>
                    
                </div>
            </div>
        `;
    });
    searchResults.innerHTML = order_content;
} else {
    searchResults.innerHTML = "No orders found.";
}