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
        document.getElementById("book-list").innerHTML = `
    <table id="example1" class="table table-bordered table-striped responsive table-hover">
                <thead>
                    <tr>
                        <th class="text-center">S/N</th>
                        <th class="text-center">Title</th>
                        <th class="text-center">Author</th>
                        <th class="text-center">Publisher</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <% var i=1; %>
                        <% books.forEach(book=> { %>

                            <tr>
                                <td>
                                    <%= i++; %>
                                </td>
                                <td>          <%= book.title %> +
                                </td>
                                <td>
                                ${"<%= book.author %>"}
                                </td>
                                <td>
                                ${"<%= book.publisher %>"}
                                </td>
                                <td class="text-center">
                                    <div class="btn-group">
                                        <a class="btn btn-info" target="blank" onclick="console.log(1)" href="/dashboard/view-books/<%=book._id%>"><i
                                                class="fa fa-eye"></i>
                                                
                                        </a>
                                        <button data-id="${"<%= book._id %>"}"
                                            data-name="<%=book.title%>"
                                            class="btn btn-danger delete-book"
                                            data-toggle="modal"
                                            data-target="#delete-book-modal"><span
                                                class="fa fa-trash delete-span"></span></button>
                                    </div>
                                </td>
                            </tr>
                            <% }) %>
                </tbody>
            </table> `;
      }
    );
  });
});
