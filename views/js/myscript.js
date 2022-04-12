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

    $.post(endpoint, { title, author, publisher, categories, status }).done(
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
    bookTitle = $(book).data("title");
    $("#modal-book-id").html(bookTitle); // Displays the title of the selected book in the modal
  });

  // When user clicks 'Yes' on delete book modal
  $("#yes-delete-btn").click(() => {
    console.log("You have confirmed to delete " + id);
    $("#delete-book-modal").modal("hide");
    $.post("/dashboard/delete-book", { id }).done();
  });
});
