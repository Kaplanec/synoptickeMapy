let year = 2021;

let monthNames = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];
let monthDays = [31, (year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

$(() => {
    generateCalendar(monthNames, monthDays);

    $("a").click((e) => {
        let date = getDate(e);
        console.log(date);
    });
});

function getDate(e) {
    const addDays = text => {
        return (text.length == 1 ? "0" : "") + text;
    }

    const addMonth = (month, offset) => {
        month = (parseInt(month) + offset) % 12 >= 0 ? (parseInt(month) + offset) % 12 + 1 : 12
        return (month.toString().length == 1 ? "0" : "") + month;
    }

    const addYear = (isDifferent, month, days) => {
        if (isDifferent) {
            if (month == 0 && parseInt(days) > 8) {
                return year - 1;
            }
            if (month == 11 && parseInt(days) < 8) {
                return year + 1;
            }
        }
        return year;
    }

    let date = addDays($(e.target).text());
    date += addMonth($(e.target).parents().eq(3).attr("class").slice(5), $(e.target).attr("class") == "different" ? (parseInt($(e.target).text()) > 8 ? -1 : 1) : 0);
    date += addYear($(e.target).attr("class") == "different", $(e.target).parents().eq(3).attr("class").slice(5), $(e.target).text());
    return date;
}

function generateCalendar(monthNames, monthDays) {
    let offset = new Date(2021, 0, 1).getDay() - 1;
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