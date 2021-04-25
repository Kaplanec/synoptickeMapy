let date;
const formatDate = date => ('0' + date.getDate()).slice(-2) + ('0' + (date.getMonth() + 1)).slice(-2) + date.getFullYear();
$(() => {
    generateCalendar(monthNames, monthDays);

    $("a").click((e) => {
        date = getDate(e);
        $(".mapDisplay").removeClass("hide");
        $(".mapImg").attr("src", `mapy/${formatDate(date)}.jpg`);
    });

    $(".fa-times").click(() => {
        $(".mapDisplay").addClass("hide");
    });

    $(".fa-arrow-left").click(() => {
        date.setDate(date.getDate() - 1);
        $(".mapImg").attr("src", `mapy/${formatDate(date)}.jpg`);
    });

    $(".fa-arrow-right").click(() => {
        date.setDate(date.getDate() + 1);
        $(".mapImg").attr("src", `mapy/${formatDate(date)}.jpg`);
    });
});

let year = 2021;

let monthNames = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];
let monthDays = [31, (year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function getDate(e) {
    const addMonth = (month, offset) => {
        return (parseInt(month) + offset) % 12 >= 0 ? (parseInt(month) + offset) % 12 : 11
    }

    const addYear = (isDifferent, month, days) => {
        if (isDifferent) {
            if (month == 0 && parseInt(days) > 8) { return year - 1; }
            if (month == 11 && parseInt(days) < 8) { return year + 1; }
        }
        return year;
    }

    return new Date(addYear($(e.target).attr("class") == "different", $(e.target).parents().eq(3).attr("class").slice(5), $(e.target).text()),
        addMonth($(e.target).parents().eq(3).attr("class").slice(5), $(e.target).attr("class") == "different" ? (parseInt($(e.target).text()) > 8 ? -1 : 1) : 0),
        parseInt($(e.target).text()));

}

function generateCalendar(monthNames, monthDays) {
    let offset = new Date(year, 0, 1).getDay() - 1;
    for (let i = 0; i < 12; i++) {
        $(".calendar").append(generateMonth(offset, monthNames[i], monthDays[i], i));
        offset = (monthDays[i] + offset) % 7;
    }
}

function generateMonth(offset, name, length, index) {
    const addBegining = content => {
        for (let i = offset - 1; i >= 0; i--) {
            content += `<td><a href="#" class="different">${monthDays[index - 1] - i || 31 - i}</a></td>`;
        }
        return content;
    }

    const addMidle = content => {
        for (let i = 1; i <= length; i++) {
            if ((i + offset) % 7 == 1 && i != 1) {
                content += `</tr><tr>`;
            }
            content += `<td><a href="#">${i}</a></td>`;
        }
        return content;
    }

    const addEnd = content => {
        for (let i = 1; i <= (7 - (length % 7 + offset) % 7) * ((length % 7 + offset) % 7 != 0); i++) {
            content += `<td><a href="#" class="different">${i}</a></td>`;
        }
        return content;
    }


    let content = `
      <table class=month${index}>
          <caption>${name}</caption>
        <tr>
          <th>Po</th>
          <th>Út</th>
          <th>St</th>
          <th>Čt</th>
          <th>Pá</th>
          <th>So</th>
          <th>Ne</th>
        </tr>
        <tr>
    `;

    content = addBegining(content);
    content = addMidle(content);
    content = addEnd(content);

    return content + `</tr>` + `</table>`;
}