// scripts/standings.js

console.log("Standings script loaded");

async function fetchContestStandings(contestId) {
  const url = `https://codeforces.com/api/contest.standings?contestId=${contestId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      // console.log("Contest Standings:", data.result);
      return data.result;
    } else {
      console.error("Error fetching standings:", data.comment);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

function countParticipantsForProblems(data) {
  const problemIndices = data.problems.map(problem => problem.index);
  const counts = {};

  // Initialize counts for each problem
  problemIndices.forEach(index => {
    counts[index] = 0;
  });

  // Iterate through each participant's problem results
  data.rows.forEach(row => {
    row.problemResults.forEach((result, index) => {
      if (result.points > 0) {
        const problemIndex = data.problems[index].index;
        counts[problemIndex]++;
      }
    });
  });

  return counts;
}

async function getProblemSolvesCount(contestId) {
  const standingsData = await fetchContestStandings(contestId);

  if (standingsData) {
    const problemResult = countParticipantsForProblems(standingsData);
    return problemResult;
  }

  return {};
}

// Expose the function globally for use in other scripts
window.getProblemSolvesCount = getProblemSolvesCount;
