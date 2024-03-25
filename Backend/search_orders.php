<?php
include 'db_connection.php';

function searchOrders($searchTerm, $searchCriteria) {
    global $conn;
    $sql = "";
    switch ($searchCriteria) {
        case "orderId":
            $sql = "SELECT o.*, c.name AS customer_name, c.email AS customer_email, c.phone AS customer_phone, c.address AS customer_address, c.pincode AS customer_pincode, c.state AS customer_state
                    FROM orders o
                    INNER JOIN customers c ON o.customer_id = c.id
                    WHERE o.id = '$searchTerm'";
            break;
        case "customerName":
            $sql = "SELECT o.*, c.name AS customer_name, c.email AS customer_email, c.phone AS customer_phone, c.address AS customer_address, c.pincode AS customer_pincode, c.state AS customer_state
                    FROM orders o
                    INNER JOIN customers c ON o.customer_id = c.id
                    WHERE c.name LIKE '%$searchTerm%'";
            break;
        case "customerEmail":
            $sql = "SELECT o.*, c.name AS customer_name, c.email AS customer_email, c.phone AS customer_phone, c.address AS customer_address, c.pincode AS customer_pincode, c.state AS customer_state
                    FROM orders o
                    INNER JOIN customers c ON o.customer_id = c.id
                    WHERE c.email = '$searchTerm'";
            break;
        case "customerPhone":
            $sql = "SELECT o.*, c.name AS customer_name, c.email AS customer_email, c.phone AS customer_phone, c.address AS customer_address, c.pincode AS customer_pincode, c.state AS customer_state
                    FROM orders o
                    INNER JOIN customers c ON o.customer_id = c.id
                    WHERE c.phone = '$searchTerm'";
            break;
        default:
            return null;
    }

    $result = $conn->query($sql);
    if ($result === false || $result->num_rows == 0) {
        return null;
    }

    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
    return $orders;
}

$searchTerm = $_GET['searchTerm'];
$searchCriteria = $_GET['searchCriteria'];
$orders = searchOrders($searchTerm, $searchCriteria);

header('Content-Type: application/json');
echo json_encode($orders);
?>
