// =====================================================
// Day 1 Demo — The Jollof Kitchen (START FILE)
// Fill in the TODOs live with the class.
// =====================================================

// ---------- Helper: write to the on-screen log ----------
const logList = document.getElementById("log");
const startTime = Date.now();

function log(message, type = "") {
  const seconds = ((Date.now() - startTime) / 1000).toFixed(1);
  const li = document.createElement("li");
  li.className = type;
  li.innerHTML = `<span class="time">[${seconds}s]</span>${message}`;
  logList.appendChild(li);
  console.log(message);
}

function subNum(a, b){
  console.log(a - b)
}

// =====================================================
// PART 0 — Sync vs Async
// =====================================================
//sync - synchronous, code is executed line by line, one after the other
//async - asynchronous, code is executed in a non-blocking way, allowing other code to run while waiting for an operation to complete
//EXAMLE OF AN SYNC FUNCTION
console.log("step 1")
console.log("step 2")
console.log("step 3")
let data = subNum(43, 12) // imagine if this task take 10 seconds 
console.log("step 4")


//EXAMPLE OF A ASYNC FUNCTION
console.log("put kettle of fire");

setTimeout(function() {
  console.log("boiled water");
}, 3000);
console.log("toast bread");
console.log ("fry Madam Waazor's eggs");


function syncVsAsync() {
  log("A: Customer walks in");
  // TODO: use setTimeout to log "B: Food is ready" after 0ms
  setTimeout(function() {
  log("B: Food is ready");
}, 3000);
  log("C: Customer sits down");
};
let synVsAsynBtn = document.getElementById("btn-sync");
synVsAsynBtn.addEventListener("click", syncVsAsync);

// =====================================================
// PART 1 — Callbacks
// =====================================================
// TODO: takeOrder(dish, callback) → after 1s, log and call callback(dish)
function takeOrder(dish, callback) {
  setTimeout(function() {
    log(`Order is taken: ${dish}`);
    callback(dish);
  }, 1000);
}
// TODO: cookFood(dish, callback) → after 2s, log and call callback(dish)
function cookFood(dish, callback) {
  setTimeout(function() {
    log(`Food is cooked: ${dish}`);
    callback(dish);
  }, 2000);
}
// TODO: serveFood(dish, callback) → after 1s, log and call callback()
function serveFood(dish, callback) {
  setTimeout(function() {
    log(`Food is served: ${dish}`);
    callback();
  }, 1000);
  callback();
}
function runCallbacks() {
  log("--- Callbacks ---");
  // TODO: nest the three functions (notice the pyramid!)
  takeOrder("jellof Rice", function(myorder) {
    cookFood(myorder, function(cookedmeal) {
      serveFood(cookedmeal, function() {
        log("Enjoy your meal!");
      });
    });
  });
}
let runCallBackBtn = document.getElementById("btn-callbacks");
runCallBackBtn.addEventListener("click", runCallbacks);

// =====================================================
// PART 2 — Promises
// =====================================================

//pending: the order is oon the way and you don't know the outcome yet
//fulfilled: the package arrived and you got what you ordered
//rejected: something went wrong (out on stock, lost is delivery, etc.) 
// A promise in javasript is an object representing a result that is not yet ready

//example

fetch("https://api.example.com/users") // fetch has you a recirpt
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.log("something went wrong", error);
  });
// TODO: takeOrderP(dish) → returns a Promise that resolves after 1s

takeOrderPom("jellof Rice")
  .then((order) => cookedFoodProm(order)) // return the next promise in the chain
  .then((cookedMeal) => serveFood(cookedMeal)) 
  .then(() => log("Enjoy your meal!"))
  .catch((error) => log(`Error: ${error.message}`)) //catch() handles error from any step
  .finally(() => log("Kitchen cleans up."));
// TODO: cookFoodP(dish, hasRice = true) → resolves after 2s,
//       or REJECTS with an Error if hasRice is false

// TODO: serveFoodP(dish) → resolves after 1s

function runPromises() {
  log("--- Promises ---");
  // TODO: chain with .then(), handle errors with .catch(), end with .finally()
}

// =====================================================
// PART 3 — async/await
// =====================================================

//examle of async/await
async function showDetails() {
  try {
    let user = await getUser();
    let order = await getOrder(user);
    let details = await getOrderDetails(order[0]);
    console.log(details);
} catch (error) {
  console.error("Error fetching details:", error);
}
};

//example 2 
//with .then
function showUser() {
  fetch("https://api.example.com/users")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    })
};

//with async/await
async function showUserAsync() {
  try {
    let response = await fetch("https://api.example.com/users");
    let responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}



async function runAsyncAwait() {
  log("--- async/await ---");
  // TODO: await each step inside try/catch
}

// =====================================================
// PART 4 — Errors
// =====================================================
async function runFailure() {
  log("--- Out of rice! ---");
  // TODO: call cookFoodP with hasRice = false inside try/catch
}

// =====================================================
// PART 5 — Promise.all (do things at the same time)
// =====================================================
async function runPromiseAll() {
  log("--- Promise.all ---");
  // TODO: cook "Jollof", "Plantain", "Chicken" at the same time
}

// ---------- Wire up the buttons ----------
document.getElementById("btn-promises").addEventListener("click", runPromises);
document.getElementById("btn-async").addEventListener("click", runAsyncAwait);
document.getElementById("btn-fail").addEventListener("click", runFailure);
document.getElementById("btn-all").addEventListener("click", runPromiseAll);
document.getElementById("btn-clear").addEventListener("click", () => (logList.innerHTML = ""));



console.log("ordering food....!");

setTimeout(function() {
  console.log("food is ready!");
}, 3000);

console.log("chatting with friends while we wait");