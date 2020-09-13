let form = document.getElementById("form_text");
form_elements = form.getElementsByClassName("text");
let r_form = document.getElementsByName("radio_group");
y = document.getElementById("y");
let check_box = document.getElementsByClassName("checkbox");
let check = 0;
button_reset = document.getElementById("reset");



console.log(y);





button = document.getElementById("button");
button_reset.addEventListener("click", function (){
    event.preventDefault();
    fetch("../php/reset.php", {
        method: 'GET',

    }).
    then(res => res.text()).
    then(table => document.querySelector("#result").innerHTML = table);
})
button.addEventListener("click", function () {
    event.preventDefault();
    console.log("1");
    for (let i = 0; i < r_form.length; i++) {
        if (r_form[i].checked) {
            var r = r_form[i].value;
            console.log(r_form[i].value);
        }
    }

    for (let i = 0; i < check_box.length; i++)
        if (check_box[i].checked) {
            var x = check_box[i].value;
            console.log(check_box[i].value);
            check++;
        }
    if (isNaN(y.value)) {
        console.log("Вы ввели не число !")
        event.preventDefault();
    } else if (check !== 1) {
        console.log("Вы выбрали больше одного чекбокса!")
        event.preventDefault();
    } else if (y.value <= -3 && y.value >= 3) {
        console.log("Вы выбрали больше одного чекбокса!")
        event.preventDefault();
    } else {
        console.log(y.value);
        event.preventDefault();
        fetch("../php/handler.php".concat("?y=").concat(y.value).concat("&check_box_group=").concat(x).concat("&radio_group=").concat(r), {
            method: 'GET',

        }).
        then(res => res.text()).
        then(table => document.querySelector("#result").innerHTML = table);
        //then(table => console.log(table));
        alert("Отлично!");
    }
    check = 0;
})