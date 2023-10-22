document.addEventListener('DOMContentLoaded', function () {
    const createForm = document.getElementById('create-form');
    const customerList = document.getElementById('customer-list');
    

    // Load customers when the page loads
    loadCustomers();

    
    // Handle form submission for creating a customer
    createForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const customer = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            email: document.getElementById('email').value,
            number: document.getElementById('number').value,
        };

        createCustomer(customer);
    });

    // Function to create a customer
    function createCustomer(customer) {
        fetch('/saveCustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response, e.g., update the UI
            loadCustomers(); // Reload the customer list after creation
        })
        .catch(error => console.error('Error:', error));
    }

    // Function to load and display the list of customers
    function loadCustomers() {
        fetch('/getAllCustomers')
        .then(response => response.json())
        .then(customers => {
            // Clear the existing customer list
            customerList.innerHTML = '';

            // Iterate through the customers and create rows in the table
            customers.forEach(customer => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${customer.id}</td>
                    <td>${customer.firstName}</td>
                    <td>${customer.lastName}</td>
                    <td>${customer.address}</td>
                    <td>${customer.city}</td>
                    <td>${customer.state}</td>
                    <td>${customer.email}</td>
                    <td>${customer.number}</td>
                    <td>
                        <button class="btn btn-primary update-button" data-customer-id="${customer.id}">Update</button>
                        <button class="btn btn-danger delete-button" data-customer-id="${customer.id}">Delete</button>
                    </td>
                `;
                customerList.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
    }

    customerList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-button')) {
            // Extract the customer ID from the data-customer-id attribute
            const customerId = event.target.getAttribute('data-customer-id');
            
            // Send a DELETE request to delete the customer
            deleteCustomer(customerId);
            loadCustomers();
        }
    });

    // Function to send a DELETE request to delete a customer
    function deleteCustomer(customerId) {
        // You should replace 'your-api-url' with the actual URL of your Spring Boot API
        fetch(`/deleteCustomer/${customerId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log('Customer deleted successfully');
                // You can update the UI or perform other actions here
            } else {
                console.error('Failed to delete customer');
            }
        })
        .catch(error => console.error('Error:', error));

    }
});


document.addEventListener('DOMContentLoaded', function () {
    const customerList = document.getElementById('customer-list');
    const updateForm = document.getElementById('update-form');

    // Add event listener to the customer list for the "Update" button
    customerList.addEventListener('click', function (event) {
        if (event.target.classList.contains('update-button')) {
            // Show the update form
            updateForm.style.display = 'block';

            // Extract the customer ID from the data-customer-id attribute
            const customerId = event.target.getAttribute('data-customer-id');
            // Set the customer ID in the hidden input field
            document.getElementById('update-customer-id').value = customerId;

            // Fetch the customer data based on the customer ID
            fetch(`getCustomer/${customerId}`)
            .then(response => response.json())
            .then(customerData => {
                // Fill the update form with the customer's existing data
                document.getElementById('update-first-name').value = customerData.firstName;
                document.getElementById('update-last-name').value = customerData.lastName;
                document.getElementById('update-address').value = customerData.address;
                document.getElementById('update-city').value = customerData.city;
                document.getElementById('update-state').value = customerData.state;
                document.getElementById('update-email').value = customerData.email;
                document.getElementById('update-number').value = customerData.number;
            })
            .catch(error => console.error('Error fetching customer data:', error));
        }
    });

    // Handle form submission for updating a customer
    updateForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const updatedCustomer = {
            id: document.getElementById('update-customer-id').value,
            firstName: document.getElementById('update-first-name').value,
            lastName: document.getElementById('update-last-name').value,
            address: document.getElementById('update-address').value,
            city: document.getElementById('update-city').value,
            state: document.getElementById('update-state').value,
            email: document.getElementById('update-email').value,
            number: document.getElementById('update-number').value,
        };

        // Send a PUT request to update the customer data
        updateCustomer(updatedCustomer);
    });

    // Function to send a PUT request to update a customer
    function updateCustomer(updatedCustomer) {
        // You should replace 'your-api-url' with the actual URL of your Spring Boot API
        fetch(`updateCustomer/${updatedCustomer.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCustomer),
        })
        .then(response => {
            if (response.ok) {
                console.log('Customer updated successfully');
                // You can update the UI or perform other actions here
                updateForm.style.display = 'none'; // Hide the update form
            } else {
                console.error('Failed to update customer');
            }
        })
        .catch(error => console.error('Error:', error));
    }
});
