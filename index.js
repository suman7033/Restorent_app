let price = document.getElementById("price");
let dish = document.getElementById("dish");
let table = document.getElementById("table");
let table1 = document.querySelector(".tb-1");
let table2 = document.querySelector(".tb-2");
let table3 = document.querySelector(".tb-3");
let dishlist = document.querySelectorAll(".dishlist");

for (let i = 0; i < dishlist.length; i++) {
  dishlist[i].addEventListener("click", deleteOrder);
}

let generateHtml = (id, price, dish, table) => {
  const li = `<li id="${id}"> ${price} - ${dish} - ${table}
                    <button type="button" class="delete" id="${id}">Delete</button>
                </li>`;
  if (table == "Table 1") {
    table1.innerHTML = table1.innerHTML + li;
  } else if (table == "Table 2") {
    table2.innerHTML = table2.innerHTML + li;
  } else if (table == "Table 3") {
    table3.innerHTML = table3.innerHTML + li;
  }
};

async function addBill(event) {
  event.preventDefault();
  if (price && dish && table) {
    let billobj = {
      price: price.value,
      dish: dish.value,
      table: table.value,
    };

    // **** post Data to Cloud using CrudCrud and POSTMAN ****//
    try {
      let response = await axios.post(
        "https://crudcrud.com/api/bbfda15e68314945b3d25e4dc5a1160a/waiterdata",
        billobj
      );

      generateHtml(
        response.data._id,
        response.data.price,
        response.data.dish,
        response.data.table
      );
    } catch (error) {
      document.body.innerHTML =
        document.body.innerHTML + "<h4> Ooops! Something Went Wrong </h4>";
      console.log(error);
    }
  }
}
//****get data from crudcrud ****//
window.addEventListener("DOMContentLoaded", async () => {
  try {
    let response = await axios.get(
      "https://crudcrud.com/api/d3811280479c474ebc87965c828935c9"
    );

    response.data.forEach((order) => {
      generateHtml(order._id, order.price, order.dish, order.table);
    });
  } catch (error) {
    console.log(error);
  }
});

// delete user

async function deleteOrder(event) {
  if (event.target.classList.contains("delete")) {
    const id = event.target.getAttribute("id");
    try {
      let response = await axios.delete(
        `https://crudcrud.com/api/d3811280479c474ebc87965c828935c9`
      );

      event.target.parentElement.remove();
      
    } catch (error) {
      console.log(error);
    }
  }
}