import axios from "axios";
import { useEffect, useState } from "react";

export const Meme = () => {
  const [memes, setMemes] = useState("");
  const [memeIndex, setMemeIndex] = useState(0);
  const [text, setText] = useState({
    top: "",
    bottom: "",
  });
  const [upLoadedImage, setUpLoadedImage] = useState(false);

  useEffect(() => {
    const url = "https://api.imgflip.com/get_memes";
    axios
      .get(url)
      .then(
        (res) => setMemes(res.data.data.memes)
        // console.log(res.data.data)
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   console.log(memes[0]);

  const handleRandom = () => {
    setMemeIndex(Math.floor(Math.random() * 100));
  };

  const handleChange = (e) => {
    const keyName = e.target.id;
    // console.log(keyName);
    const newValue = e.target.value.toUpperCase();
    setText((prev) => ({ ...prev, [keyName]: newValue }));
  };

  //   console.log(text.top);

  const handleUploadImage = (e) => {
    const imageFile = e.target.files[0];
    setUpLoadedImage(true);
    const upLoadedImageUrl = URL.createObjectURL(imageFile);
    // console.log(upLoadedImageUrl);
    setMemes(upLoadedImageUrl);
  };

  return (
    <div className="container">
      {!memes.length ? (
        <h3>Loading</h3>
      ) : (
        <div>
          <input
            id="top"
            type="text"
            placeholder="inputTop"
            onChange={handleChange}
          />
          <input
            id="bottom"
            type="text"
            placeholder="inputBottom"
            onChange={handleChange}
          />
          <button onClick={handleRandom}>Pick a meme for me</button>
          <h2>{memes[memeIndex].name}</h2>
          <div
            className="memeImgTextContainer"
            style={
              !upLoadedImage
                ? {
                    backgroundImage: `url(${memes[memeIndex].url})`,
                  }
                : {
                    backgroundImage: `url(${memes})`,
                  }
            }
          >
            <p className="memeText">{text.top}</p>
            <p className="memeText">{text.bottom}</p>
          </div>
          <div className="upload">
            <input
              className="uploadInput"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleUploadImage(e)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
