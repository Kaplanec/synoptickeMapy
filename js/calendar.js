let year = 2021;

let monthNames = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];
let monthDays = [31, (year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

$(() => {
    generateCalendar(monthNames, monthDays);

    $("a").click((e) => {
        const addDays = text => {
            return (text.length == 1 ? "0" : "") + text;
        }

        const addMonth = month => {
            return (month.length == 1 && month != 9 ? "0" : "") + (parseInt(month) + 1);
        }

        let date = addDays($(e.target).text());
        date += addMonth($(e.target).parents().eq(3).attr("class").slice(5));
        date += year;
        if ($(e.target).attr("class") == "different") {
            if ($(e.target).parents().eq(3).attr("class").slice(5) == 0 && parseInt(date.slice(0, -6)) > 8) {
                date = date.slice(0, -6);
                date += 12;
                date += year - 1;
            } else if (parseInt(date.slice(0, -6)) > 8) {
                date = date.slice(0, -6);
                date += addMonth((parseInt($(e.target).parents().eq(3).attr("class").slice(5)) - 1).toString());
                date += year;
            } else if ($(e.target).parents().eq(3).attr("class").slice(5) == 11 && parseInt(date.slice(0, -6)) < 8) {
                date = date.slice(0, -6);
                date += "01";
                date += year + 1;
            } else {
                date = date.slice(0, -6);
                date += addMonth((parseInt($(e.target).parents().eq(3).attr("class").slice(5)) + 1).toString());
                date += year;
            }
        }
        console.log(date);
    })
});

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