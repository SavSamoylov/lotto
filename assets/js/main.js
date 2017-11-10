$(document).ready(()=>{
  // Gather DOM elements
  // ========================

  const winningNumbers = $('.winning-numbers');
  const winningNumbersChildren = winningNumbers.children();
  const latestResultDate =$('#latest-result-date');
  const latestResultMultiplier =$('#latest-result-multiplier');
  const pastResultsBlock =$('.past-results > .row');

  // Retrieve Winning numbers
  // ========================

  const url = 'https://data.ny.gov/resource/h6w8-42p9.json';

  $.get(url, (data) => {
    // Deconstruct Array Data
    [latest, one, two, three] = data;

    const pastResults = [one, two, three]

    const wNums = latest.winning_numbers.split(' ');
    wNums.push(latest.mega_ball);
    const wNumsMultiplier = "x" + latest.multiplier.split("")[1];
    const wNumsDate = moment(latest.draw_date).format("MMM Do");

    // Render Latest Winning Numbers/Date/Multiplier
    wNums.map(num => winningNumbers.append(`<div>${num}</div>`));
    latestResultDate.append(wNumsDate);
    latestResultMultiplier.append(wNumsMultiplier);

    // Render the other latest results
    pastResults.map(num => {

      const numsArray = num.winning_numbers.split(" ");
      numsArray.push(num.mega_ball);
      numsArray.push("x" + num.multiplier.split("")[1]);
      console.log(numsArray);

      pastResultsBlock.append(`
        <div class="col-12">
          <div class="animated flipInY past-result-item box-shadow">
            <div class="past-result-date">${moment(num.draw_date).format("MMM Do")}</div>
            <div class="past-result-numbers">
              ${numsArray.map(number => `<span>${number}</span>`).join("")}
            </div>
          </div>
        </div>
        `)
      })

    })

    // Animate Winning numbers
    // ========================

    setTimeout(function animateWinningNumbers() {
      winningNumbers.toggleClass('animated pulse')
      setTimeout(animateWinningNumbers, 5000);
    }, 1000);

    setTimeout(function animateWinningNumbersChildren() {
      winningNumbersChildren.toggleClass('animated pulse')
      setTimeout(animateWinningNumbersChildren, 5000);
    }, 2000);


  })
