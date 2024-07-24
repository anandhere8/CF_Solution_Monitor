// content.js

console.log("Content script loaded");

function getContestId() {
  const url = window.location.href;
  console.log('Url - ', url);
  const regex = /^https:\/\/codeforces\.com\/contest\/(\d+)$/;
  const match = url.match(regex);
  
  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
}


window.onload = async () =>  {
  const contestId = getContestId();
  console.log('Constest ID - ', contestId);
  if (window.getProblemSolvesCount) {
    const contestId = getContestId();
    if (contestId) {
      console.log('Contest ID - ', contestId);
      try {
        const problemResult = await window.getProblemSolvesCount(contestId);
        console.log("Number of participants who solved each problem:", problemResult);
        window.updateTable(problemResult)
      } catch (error) {
        console.error("Error fetching problem solves count:", error);
      }
    } else {
      console.log("Contest ID not found in URL.");
    }
  } else {
    console.error("getProblemSolvesCount is not available.");
  }
};
