$(document).ready(function () {
    "use strict";

    var url, nm, em, sb, ms, errors, collect, i, dt;


    dt = {};
    errors = [];



    $("main").load("./partials/articles.html");

    $(".navbar a").on("click", function (ev) {
        ev.preventDefault();
        url = $(this).attr("href");
        $("main").load(url, function () {
            if (url === "./partials/contact.html") {
                $("form").on("submit", validateForm);
            }
        });
    });

    function handleResponse(rsp) {
        $(".feedback").html(rsp);
        $("#name").val("");
        $("#email").val("");
        $("#subject").val("");
        $("#comment").val("");
    }



    function handleErrors(jqXHR, textStatus, errorThrown) {
        console.log("Error Returned - " + errorThrown);
    }

    function validateForm(ev) {
        ev.preventDefault();
        $(".title").html = "HERE";
        nm = $.trim($("#name").val());
        em = $.trim($("#email").val());
        sb = $.trim($("#subject").val());
        ms = $.trim($("#comment").val());

        if (nm === "") {
            errors.push("Please provide you name.");
        } else {
            dt.name = nm;
        }

        if (em === "") {
            errors.push("Please provide you email.");
        } else {
            dt.email = em;
        }

        if (sb === "") {
            errors.push("Please enter the reason for contact.");
        } else {
            dt.subject = sb;
        }

        if (ms === "") {
            errors.push("Please write a brief reason for contacting us.");
        } else {
            dt.comment = ms;
        }

        if (errors.length === 0) {
            console.log(dt);
            $.ajax({
                url: "./web-service/connect.php",
                type: "post",
                data: dt
            }).done(handleResponse).fail(handleErrors);


        } else {
            collect = "<p>Please fix the following errors:</p><ul>";
            for (i = 0; i < errors.length; i++) {
                collect += "<li>" + errors[i] + "</li>";
            }
            collect += "</ul>";

            $(".feedback").html(collect);
            errors = [];
        }

    }


});
