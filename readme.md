# jQuery DOM Manipulation - Aircraft Seat Selector
You should create a Javascript file called jQueryTest.js locally to this HTML file - all code should be in this file. Do not edit this HTML document.\
\
*Hint: Functions you may need - [.each()](https://api.jquery.com/each/) [.parent()](https://api.jquery.com/parent/) [.data()](https://api.jquery.com/data/)*

## Task 1
- Each Standard Fare costs €25, whenever the `#totalPassengers` value changes, update the total price in `#totalPrice`
- Prevent `#totalPassengers` from going below 0 passengers, or above 9 passengers.

## Task 2
- When `button.seat` is clicked, if seat has the class `.available`, remove the elements class `.available` and add the class `.selected` in its place
- When `button.seat` is clicked, if seat has the class `.selected`, remove the elements class `.selected` and add the class `.available` in its place

## Task 3
- Seats 1D, 3F, and 4B have already been reserved, remove the elements class `.available` and add the class `.unavailable` in its place on page load.
- Ensure your code does not permit selecting `.unavailable` seats.

## Task 4
- Limit `button.seats` selected to the quantity of `#totalPassengers`
- When `#totalPassengers` changes, remove all seat selections.

## Task 5
- When each seat is selected, ensure each passengers seats are listed in `#seatList > ul` in the format of "Passenger 1: 3B" for each list item.
- Ensure that when a seat is changed or removed, that the `#seatList > ul` stays up to date, if no seats are selected, add a single list item that says "No Seats Selected"

## Task 6
- The first row of seats are "Extra Leg Room" and incur an additional charge of €15 - ensure this is reflected in the total price and note the extra charge in `#seatList > ul` against the relevant seats.

## Task 7
- You've been asked to add a COVID restrictions mode to the booking form, when `var covidRestrictions = true;` you must ensure all middle seats are unavailable, however, as the total rows of the plane can vary, you must use loops.
- Ensure COVID restrictions are turned on.

## Task 8
- When #checkout is clicked, complete the following validation:
- - `#totalPassengers` is greater than 0, if not, alert the user they must specify atleast 1 passenger to checkout.
- - `#totalPassengers` is equal to the number of seats selected, if not, alert the user to reserve all seats for all passengers.
- - `#termsAndConditions` is checked, if not, alert the user they must agree to the Terms and Conditions.
- If validation passes, mark all selected seats as `.unavailable`, display an alert saying the booking was successful, and clear the form (T&C's unchecked, Total Passengers = 0,  Reset Seat List, Total Price = 0.00) to allow another reservation.

## Task 9
- The aircraft has changed and it now has 7 rows, dynamically add 2 extra rows of seats on page load.
- Ensure all functionality from the previous tasks still operate on these 2 extra rows.

## Task 10 / Advanced (Optional)
- Create a variable `var totalRows = 15;` which allows you to dynamically create as many rows required by overwriting `#plane`
- Ensure all functionality from the previous tasks still operate on any sized aircraft.