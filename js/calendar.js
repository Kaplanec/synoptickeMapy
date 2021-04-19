let year = 2021;

let monthNames = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];
let monthDays = [31, (year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

$(() => {
    let offset = new Date(2021, 0, 1).getDay() - 1;
    for (let i = 0; i < 12; i++) {
        generateMonth(offset, monthNames[i], monthDays[i], i);
        offset = (monthDays[i] + offset) % 7;
    }
});

function generateMonth(offset, name, length, index) {
    let content = `
      <table>
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
    for (let i = offset - 1; i >= 0; i--) {
        content += `<td>${monthDays[index - 1] - i || 31 - i}</td>`;
    }
    content += `</tr>`;

    $(".calendar").append(content + `</table>`);
}