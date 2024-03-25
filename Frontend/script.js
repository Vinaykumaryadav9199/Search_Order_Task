function searchOrders(event) {
    event.preventDefault();
    
    // Show loading message
    var searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "<h1>Loading...</h1>";
    
    var searchTerm = document.getElementById("searchTerm").value.trim();
    var searchCriteria = document.querySelector('input[name="searchCriteria"]:checked').value;
    if (searchTerm !== "") {
        fetch(`http://localhost/Search_Order_Task/backend/search_orders.php?searchTerm=${searchTerm}&searchCriteria=${searchCriteria}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                displayResults(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                // Display error message
                searchResults.innerHTML = "<h1>Error fetching data. Please try again later.</h1>";
            });
    } else {
        // Display message if search term is empty
        searchResults.innerHTML = "<h1>Please enter a search term</h1>";
    }
}

function displayResults(data) {
    var searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";
    console.log(data);
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
                            <p id ="product_date">Order Date</p>
                            <p>${order.Date}</p>
                       </div>
                       <div>
                            <p>${trasid}</p>
                            <p id="PaymentStatus">${PaymentStatus}</p>
                       </div>
                       <div>
                            <p id ="buyerDetails">Buyer Details</p>
                            <p>${order.customer_name}</p>
                            <p>${order.customer_address}</p>
                            <p>Email: ${order.customer_email}</p>
                            <span>Phone: ${order.customer_phone} </span>
                            <span>Pincode: ${order.customer_phone} </span>
                       </div>
                       <div>
                            <p id="aboutpayment">${aboutPayment}</p>
                            <p id="total">Total: ${order.Price}</p>
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
                                    <a  id ="product_name"href="hello">${order.ProductName}</a>
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
        searchResults.innerHTML = `<div id="notfound">No orders Found.</div>`;
    }
}

document.getElementById("Search_btn").addEventListener("click", searchOrders);
