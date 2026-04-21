import { useState } from "react";

export default function App() {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [coverURL, setCoverURL] = useState("");

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) setAudioURL(URL.createObjectURL(file));
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) setCoverURL(URL.createObjectURL(file));
  };

  const addSong = () => {
    if (!title || !artist || !audioURL) return;
    setSongs([...songs, { title, artist, audioURL, coverURL, streams: 0 }]);
    setTitle("");
    setArtist("");
    setAudioURL("");
    setCoverURL("");
  };

  const playSong = (index) => {
    const updated = [...songs];
    updated[index].streams += 1;
    setSongs(updated);
  };

  const top10 = [...songs].sort((a, b) => b.streams - a.streams).slice(0, 10);

  return (
    <div style={{ padding: 20 }}>
      <h1>BOLOBEDU HOUSE MUSIC</h1>

      <h2>Upload</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br/>
      <input placeholder="Artist" value={artist} onChange={e => setArtist(e.target.value)} /><br/>
      <input type="file" accept="audio/*" onChange={handleAudioUpload} /><br/>
      <input type="file" accept="image/*" onChange={handleCoverUpload} /><br/>
      <button onClick={addSong}>Upload</button>

      <h2>Tracks</h2>
      {songs.map((song, i) => (
        <div key={i}>
          <p>{song.title} - {song.artist}</p>
          <audio controls src={song.audioURL} onPlay={() => playSong(i)} />
          <p>{song.streams} plays</p>
          <a href={song.audioURL} download>Download</a>
        </div>
      ))}

      <h2>Top 10</h2>
      {top10.map((song, i) => (
        <p key={i}>{i+1}. {song.title} - {song.artist}</p>
      ))}
    </div>
  );
}
