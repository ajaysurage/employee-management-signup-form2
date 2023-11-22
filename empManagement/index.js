var empList = [];

$('#submit').click(() => {
    let name = $('#name').val();
    let email = $('#email').val();
    let pass = $('#pass').val();
    let mobile = $('#mobile').val();
    let city = $('#city').val();
    let age = $('#age').val();

    var emp = {
        name: name,
        email: email,
        pass: pass,
        mobile: mobile,
        city: city,
        age: age
    };

    if (name !== "" && email !== "" && pass !== "" && mobile !== "" && city !== "" && age !== "") {
        if (empList.some((element) => element.email === emp.email)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Email is already added",
            });

        } else {
            if (parseInt(age) < 18) {
                Swal.fire({
                    title: "Invalid Age",
                    text: "Age must be 18 and above",
                    icon: "error",
                });
                return;
            }

            if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
                Swal.fire({
                    title: "Invalid Password",
                    text: "Password must contain at least one special character",
                    icon: "error",
                });
                return;
            }
            empList.push(emp);
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Added successfully",
                showConfirmButton: false,
                timer: 1500
            });

            $("#name").val("");
            $("#email").val("");
            $("#pass").val("");
            $("#mobile").val("");
            $("#city").val("");
            $("#age").val("");
        }
        console.log(empList);
        renderTable(); 
    } else {

        Swal.fire("Fields cannot be empty");

    }
});

function renderTable() {
    if (empList.length !== 0) {
        var table = `<table class="table table-hover">
            <thead class="table-dark">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Mobile Number</th>
                    <th>City</th>
                    <th>Age</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>`;

        empList.forEach((e, index) => {
            table += `<tr>
                        <td>${e.name}</td>
                        <td>${e.email}</td>
                        <td>${e.pass}</td>
                        <td>${e.mobile}</td>
                        <td>${e.city}</td>
                        <td>${e.age}</td>
                        <td>
                            <button class="btn btn-danger delete" data-id="${e.email}">Delete</button>
                        </td>
                    </tr>`;
        });

        table += `</tbody></table>`;
        $(".empData").html(table);
    } else {
        $(".empData").html("");
    }
}

$('body').on('click', '.delete', function () {
    var emailToDelete = $(this).data('id');

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            empList = empList.filter(a => a.email !== emailToDelete);
            renderTable();

            Swal.fire({
                title: "Deleted!",
                text: "Your entry has been deleted.",
                icon: "success"
            });
        }
    });
});
