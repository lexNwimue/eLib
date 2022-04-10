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
});
