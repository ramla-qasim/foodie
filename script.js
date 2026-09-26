// ======================================================
// STEP 1 - ARRAY OF OBJECTS
// ======================================================

let menuItems = [

    {
        id: 1,
        name: "Chicken Burger",
        category: "Fast Food",
        price: 650,
        availability: "Available"
    },

    {
        id: 2,
        name: "Chicken Biryani",
        category: "Pakistani",
        price: 450,
        availability: "Available"
    },

    {
        id: 3,
        name: "Chicken Karahi",
        category: "Pakistani",
        price: 1200,
        availability: "Available"
    },

    {
        id: 4,
        name: "Pizza",
        category: "Fast Food",
        price: 900,
        availability: "Available"
    },

    {
        id: 5,
        name: "Chocolate Cake",
        category: "Dessert",
        price: 500,
        availability: "Unavailable"
    },

    {
        id: 6,
        name: "Mango Shake",
        category: "Drinks",
        price: 300,
        availability: "Available"
    }

];


// ======================================================
// STEP 2 - DISPLAY ARRAY USING map()
// ======================================================

function displayMenu(items = menuItems) {

    let menuCards = document.getElementById("menuCards");

    menuCards.innerHTML = "";


    if (items.length === 0) {

        menuCards.innerHTML = "<p>No matching items found.</p>";

        return;
    }


    items.map(function(item) {

        menuCards.innerHTML += `

            <div class="card">

                <h3>${item.name}</h3>

                <p>Category: ${item.category}</p>

                <p>Price: Rs. ${item.price}</p>

                <p>Availability: ${item.availability}</p>

                <button onclick="editItem(${item.id})">
                    Edit
                </button>

                <button onclick="deleteItem(${item.id})">
                    Delete
                </button>

            </div>

        `;

    });

}


// ======================================================
// STEP 3 - ADD OBJECT USING push()
// ======================================================

let menuForm = document.getElementById("menuForm");


menuForm.addEventListener("submit", function(event) {

    event.preventDefault();


    let newItem = {

        id: Date.now(),

        name: document.getElementById("itemName").value,

        category: document.getElementById("itemCategory").value,

        price: Number(
            document.getElementById("itemPrice").value
        ),

        availability:
            document.getElementById("itemAvailability").value

    };


    // Add new object to array

    menuItems.push(newItem);


    // Display updated array

    displayMenu();


    // Clear form

    menuForm.reset();

});


// ======================================================
// STEP 4 - DELETE USING filter()
// ======================================================

function deleteItem(id) {

    menuItems = menuItems.filter(function(item) {

        return item.id !== id;

    });


    displayMenu();

}


// ======================================================
// STEP 5 - EDIT FUNCTIONALITY
// ======================================================

let selectedId = null;


function editItem(id) {

    selectedId = id;


    let item = menuItems.find(function(item) {

        return item.id === id;

    });


    document.getElementById("editName").value =
        item.name;


    document.getElementById("editCategory").value =
        item.category;


    document.getElementById("editPrice").value =
        item.price;


    document.getElementById("editAvailability").value =
        item.availability;


    document.getElementById("editModal").style.display =
        "block";

}


// ======================================================
// UPDATE OBJECT
// ======================================================

function updateItem() {

    let item = menuItems.find(function(item) {

        return item.id === selectedId;

    });


    item.name =
        document.getElementById("editName").value;


    item.category =
        document.getElementById("editCategory").value;


    item.price =
        Number(document.getElementById("editPrice").value);


    item.availability =
        document.getElementById("editAvailability").value;


    displayMenu();


    closeModal();

}


// ======================================================
// CANCEL EDIT
// ======================================================

function closeModal() {

    document.getElementById("editModal").style.display =
        "none";

}


// ======================================================
// STEP 6 - SEARCH FILTERS
// ======================================================

function applyFilters() {

    let searchName =
        document.getElementById("searchName").value
        .toLowerCase();


    let category =
        document.getElementById("categoryFilter").value;


    let availability =
        document.getElementById("availabilityFilter").value;


    let price =
        document.getElementById("priceFilter").value;


    let type =
        document.getElementById("typeFilter").value;


    let filteredItems = menuItems.filter(function(item) {


        // Filter 1 - Search by name

        let nameMatch =
            item.name.toLowerCase().includes(searchName);


        // Filter 2 - Category

        let categoryMatch =
            category === "All" ||
            item.category === category;


        // Filter 3 - Availability

        let availabilityMatch =
            availability === "All" ||
            item.availability === availability;


        // Filter 4 - Price

        let priceMatch = true;


        if (price === "Low") {

            priceMatch = item.price < 500;

        }

        else if (price === "Medium") {

            priceMatch =
                item.price >= 500 &&
                item.price <= 1000;

        }

        else if (price === "High") {

            priceMatch = item.price > 1000;

        }


        // Filter 5 - Item Type

        let typeMatch =
            type === "All" ||
            item.category === type;


        return (
            nameMatch &&
            categoryMatch &&
            availabilityMatch &&
            priceMatch &&
            typeMatch
        );

    });


    displayMenu(filteredItems);

}


// ======================================================
// STEP 7 - IF ELSE CONDITIONS
// ======================================================

function runConditions() {

    let result = document.getElementById("conditionResults");

    result.innerHTML = "";


    for (let i = 0; i < menuItems.length; i++) {

        let item = menuItems[i];

        let message = "";


        // Condition 1 - Availability

        if (item.availability === "Available") {

            message +=
                item.name + " is available. ";

        }

        else {

            message +=
                item.name + " is unavailable. ";

        }


        // Condition 2 - Price

        if (item.price > 1000) {

            message += "It is an expensive item. ";

        }

        else {

            message += "It is an affordable item. ";

        }


        // Condition 3 - Category

        if (item.category === "Fast Food") {

            message += "It is a fast food item. ";

        }

        else {

            message += "It is not a fast food item. ";

        }


        // Condition 4 - Dessert

        if (item.category === "Dessert") {

            message += "It is a dessert. ";

        }

        else {

            message += "It is not a dessert. ";

        }


        // Condition 5 - Price level

        if (item.price >= 500) {

            message += "Price is Rs. 500 or more.";

        }

        else {

            message += "Price is below Rs. 500.";

        }


        result.innerHTML += `

            <div class="result">

                <strong>${item.name}</strong>

                <br><br>

                ${message}

            </div>

        `;

    }

}


// ======================================================
// STEP 8 - FOR LOOP
// ======================================================

function runForLoop() {

    let result =
        document.getElementById("forLoopResults");


    result.innerHTML = "";


    for (let i = 0; i < menuItems.length; i++) {

        result.innerHTML += `

            <div class="result">

                ${i + 1}. 
                ${menuItems[i].name}
                -
                Rs. ${menuItems[i].price}

            </div>

        `;

    }

}


// ======================================================
// STEP 9 - WHILE LOOP
// ======================================================

function runWhileLoop() {

    let result =
        document.getElementById("whileLoopResults");


    result.innerHTML = "";


    let i = 0;


    while (i < menuItems.length) {

        result.innerHTML += `

            <div class="result">

                ${i + 1}. 
                ${menuItems[i].name}
                -
                ${menuItems[i].category}

            </div>

        `;


        i++;

    }

}


// ======================================================
// STEP 10 - LOOP + CONDITIONS
// ======================================================

function runCombinedLogic() {

    let result =
        document.getElementById("combinedResults");


    result.innerHTML = "";


    for (let i = 0; i < menuItems.length; i++) {

        let item = menuItems[i];

        let categoryMessage = "";


        if (item.price > 1000) {

            categoryMessage =
                "Premium Item";

        }

        else if (item.price >= 500) {

            categoryMessage =
                "Regular Item";

        }

        else {

            categoryMessage =
                "Budget Item";

        }


        result.innerHTML += `

            <div class="result">

                <strong>${item.name}</strong>

                <br>

                Category:
                ${item.category}

                <br>

                Price:
                Rs. ${item.price}

                <br>

                Classification:
                ${categoryMessage}

            </div>

        `;

    }

}


// ======================================================
// RUN ALL OUTPUT FUNCTIONS
// ======================================================

displayMenu();

runConditions();

runForLoop();

runWhileLoop();

runCombinedLogic();