$(document).ready(() => {
  // Script for add-book in sidebar.ejs
  $("#add-book").click((e) => {
    e.preventDefault();
    const title = $("#title").val();
    const author = $("#author").val();
    const publisher = $("#publisher").val();
    const categories = $("#categories").val();
    const status = $("input[name = status]:checked").val();
    const endpoint = "/dashboard/add-book";
    console.log(title, author, publisher, categories, status);

    $.post(endpoint, { title, author, publisher, categories, status })
      .done(
        (book) => {
        console.log(book);
        $("#add-book-modal").modal("hide");
      }
    );
  });

  // Script for delete-book in allBooks.ejs
  // Getting the clicked book ID for the delete operation and loading the title into the modal header
  let id;
  $(".delete-book").on("click", (e) => {
    book = e.target.closest("button"); // Get ID of clicked book;
    id = book.id;
    const bookTitle = $(book).data('title');
    
    $("#modal-del-book-title").html(bookTitle); // Displays the title of the selected book in the modal
  });

  // When user clicks 'Yes' on delete book modal
  $("#yes-delete-btn").click(() => {
    console.log("You have confirmed to delete " + id);
    $("#delete-book-modal").modal("hide");
    $.post("/dashboard/delete-book", { id }).done();
  });

  // userViewRequests: Implementing borrow functionality on borrow button click
  $('#borrow-btn').on('click', (e) => {
      e.preventDefault();
      const selectedBook = document.getElementById('available-books'),
          bookTitle = selectedBook.options[selectedBook.selectedIndex].text,
          bookID = selectedBook.options[selectedBook.selectedIndex].value;
          
          // I could not figure out a way to get EJS values inside this .js file, so I had to improvise
          // and set the EJS value as a data-id in the EJS file, the value of which I called in the .js file
          const userID = $('#userID').data('id');
          const username = $('#username').data('id');
      
      console.log(username, bookTitle, bookID, userID);
      $.post('/dashboard/user/send-request', { userID, username, bookID, bookTitle })
          .done((response) => {
              if (response.failed) {
                  const alertDiv = document.getElementById('request-success');
                  alertDiv.innerHTML = 'Failed: Request already made!';
                  alertDiv.classList.add('alert-danger');
                  alertDiv.classList.add('d-block');

                  setTimeout(() => {
                      alertDiv.innerHTML = '';
                      alertDiv.classList.remove('alert');
                      alertDiv.classList.remove('alert-danger');
                  }, 6000)
              }
              else {
                  const alertDiv = document.getElementById('request-success');
                  alertDiv.innerHTML = 'Request sent successfully...';
                  alertDiv.classList.add('alert-success');
                  alertDiv.classList.add('d-block');

                  setTimeout(() => {
                      alertDiv.innerHTML = '';
                      alertDiv.classList.remove('alert');
                      alertDiv.classList.remove('alert-success');
                  }, 5000)
              }
          })
  });

  // Scripts for cancel requests in userViewRequests.ejs
  $(".cancel-request-btn").click(e => {
    e.preventDefault();
    id = e.target.id;  // Get ID of clicked button;
    console.log(id);
    $.post("/dashboard/user/cancel-request", { id })
      .done( response => console.log(response));
  });

  // Scripts for pendingRequests.ejs
  // Approving user requests
  $('.approve-btn').click(e => {

    $.post('/dashboard/approve-request', {id})
      .done(response => console.log(response))

  });

  $('.decline-btn').click(e => {
    id = e.target.id;
    //console.log(id);
  });

  // Activate all tooltips
  $('[data-toggle = "tooltip"]').tooltip();
});
