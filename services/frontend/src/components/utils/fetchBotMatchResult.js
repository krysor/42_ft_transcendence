const backendHost = 'http://' + window.location.hostname + ':8000';

let fetchBotMatchResult = (player1, p1Result, botResult) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const is_pong = true;

    const jsonData = {
      p1ID: player1.id,
      p1Result: p1Result,
      p2ID: "0",
      p2Result: botResult,
      date: formattedDate,
      is_pong: is_pong,
    };

    fetch(backendHost + '/tournament/add_match_to_historic/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData)
    })
      .then(response => {
        if (!response.ok) {
          throw response.error;
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }