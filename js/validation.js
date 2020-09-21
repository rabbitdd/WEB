form = document.getElementById("main_form");
form_elements = form.getElementsByClassName("text");
r_form = document.getElementsByName("radio_group");
y = document.getElementById("y");
check_box = document.getElementsByClassName("checkbox");
button_reset = document.getElementById("reset");
let check = 0;
xhr = new XMLHttpRequest();
table = document.querySelector("#result");
const arr = ["blue", "black", "red", "green", "yellow"];

document.getElementById("triangle").addEventListener("mouseup", function () {
    document.getElementById("y").value = -1 * ((event.pageY - 350) / 30);
    document.getElementById("triangle").style.fill = arr[randomInteger(0, 4)];
});
document.getElementById("rectangle").addEventListener("mouseup", function () {
    document.getElementById("y").value = -1 * ((event.pageY - 350) / 30);
    document.getElementById("rectangle").style.fill = arr[randomInteger(0, 4)];
});
document.getElementById("half_circle").addEventListener("mouseup", function () {
    document.getElementById("y").value = -1 * ((event.pageY - 350) / 30);
    document.getElementById("half_circle").style.fill = arr[randomInteger(0, 4)];

});

function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min + 1);
    return Math.round(rand);
}




button = document.getElementById("button");
button_reset.addEventListener("click", function (){
    event.preventDefault();
    fetch("../php/reset.php", {
        method: 'GET',

    }).
    then(res => res.text()).
    then(table => document.querySelector("#result").innerHTML = table);
})

var reg = /[1-9]/;
function checkOdz(x) {
    if (x.indexOf('.') !== -1) {
        idx = x.indexOf('.');
        ceil = x.substr(0, idx);
        post = x.substr(idx + 1);
        console.log(ceil, post);
        if (Math.abs(ceil) < 3)
            return false;
        else {
            return post.match(reg);
        }
    } else {
        console.log(x);
        return Math.abs(x) > 3;
    }

}
button.addEventListener("click", function () {
    event.preventDefault();
    if (!y.value.length) {
        alert("Введите игрек")
    } else {
        for (let i = 0; i < r_form.length; i++) {
            if (r_form[i].checked) {
                var r = r_form[i].value;
                //console.log(r_form[i].value);
            }
        }

        for (let i = 0; i < check_box.length; i++)
            if (check_box[i].checked) {
                var x = check_box[i].value;
                //console.log(check_box[i].value);
                check++;
            }
        if (isNaN(y.value) || checkOdz(y.value)) {
            alert("Вы ввели не число !".concat(" Вводить можно только числа в диапазоне от -3 до 3"))
            event.preventDefault();
        } else if (check !== 1) {
            if (!check)
                alert("Вы не выбрали чекбокс!");
            else
                alert("Вы выбрали больше одного чекбокса!")
            event.preventDefault();
        } else {
            console.log(y.value);
            event.preventDefault();
            /*xhr.open('GET',
                "../php/handler.php"
                    .concat("?y=")
                    .concat(y.value)
                    .concat("&check_box_group=")
                    .concat(x).concat("&radio_group=")
                    .concat(r));
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4 && xhr.status === 200) {
                  console.log(xhr.responseText);
                    table.innerHTML = xhr.responseText;
              }
            };
            xhr.send(null);

             */

            // with promise and Fetch API
            /*fetch("../php/handler.php".concat("?y=").concat(y.value).concat("&check_box_group=").concat(x).concat("&radio_group=").concat(r), {
                method: 'GET',

            })
                .then(res => res.text())
                .then(table => document.querySelector("#result").innerHTML = table)
                //.then(table => console.log(table));
            //then(table => console.log(table));
             */

            // with jquery
            $.ajax({
                type: 'GET',
                url: "../php/handler.php"
                    .concat("?y=")
                    .concat(y.value)
                    .concat("&check_box_group=")
                    .concat(x).concat("&radio_group=")
                    .concat(r),
                success: function (html) {
                    $("#result").html(html);
                }
            });

            // with superagent
            /*const req = require('superagent');
            req
                .get("../php/handler.php"
                    .concat("?y=")
                    .concat(y.value)
                    .concat("&check_box_group=")
                    .concat(x).concat("&radio_group=")
                    .concat(r))
                .then(res => {
                    table.innerHTML = res.text();
                })

             */
            alert("Отлично!");
        }
        check = 0;
    }
})