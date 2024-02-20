let songs = [];
let votingTime = 300000; // 5 minutes in milliseconds

function addSong() {
  const songTitleInput = document.getElementById('songTitle');
  const songTitle = songTitleInput.value.trim();

  if (songTitle !== '') {
    songs.push({ title: songTitle, votes: 0 });
    songTitleInput.value = '';
    renderSongs();
  }
}

function renderSongs() {
  const songList = document.getElementById('songList');
  songList.innerHTML = '';

  songs.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${song.title} - Głosy: ${song.votes}`;
    listItem.onclick = () => vote(index);
    songList.appendChild(listItem);
  });
}

function vote(index) {
  if (songs[index]) {
    songs[index].votes++;
    renderSongs();
  }
}

function removeSongWithMostVotes() {
  if (songs.length > 0) {
    let maxVotes = -1;
    let indexToRemove = -1;

    songs.forEach((song, index) => {
      if (song.votes > maxVotes) {
        maxVotes = song.votes;
        indexToRemove = index;
      }
    });

    if (indexToRemove !== -1) {
      songs.splice(indexToRemove, 1);
      renderSongs();
    }
  }
}

setInterval(removeSongWithMostVotes, votingTime);
