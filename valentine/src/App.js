import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import myImage from "./IMG-20210114-WA0012.jpg";


function App() {
  const areaRef = useRef(null);
  const noBtnRef = useRef(null);
  const [noPosition, setNoPosition] = useState({ x: 220, y: 90 });
  const [accepted, setAccepted] = useState(false);

  const moveNoButton = () => {
    if (!areaRef.current || !noBtnRef.current) return;

    const maxX = areaRef.current.clientWidth - noBtnRef.current.offsetWidth;
    const maxY = areaRef.current.clientHeight - noBtnRef.current.offsetHeight;

    setNoPosition({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!noBtnRef.current) return;
      const rect = noBtnRef.current.getBoundingClientRect();
      const distance = 120;

      if (
        e.clientX > rect.left - distance &&
        e.clientX < rect.right + distance &&
        e.clientY > rect.top - distance &&
        e.clientY < rect.bottom + distance
      ) {
        moveNoButton();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="container">
      <div className="hearts"></div>

      {!accepted ? (
        <div className="card">
          {/* 🎀 Show GIF above the question */}
          <img
            src="https://media1.tenor.com/m/u1OqA3bNXyQAAAAC/hi-waving.gif"
            alt="Bubu Dudu cute gif"
            className="loveGif"
          />

          <h1 className="question gradientText">
            💖 Do you love me Bubu? 💖
          </h1>

          <div className="buttonArea" ref={areaRef}>
            <button className="yesBtn" onClick={() => setAccepted(true)}>
              Yes ❤️
            </button>

            <button
              ref={noBtnRef}
              className="noBtn"
              style={{ left: noPosition.x, top: noPosition.y }}
            >
              No 💔
            </button>
          </div>
        </div>
      ) : (
        <div className="card successCard">
          {/* 🎉 Success animation GIF */}
          <img
            src="https://media1.tenor.com/m/5T24_rbk7vYAAAAd/bubu-dudu-kisses.gif"
            alt="Bubu Dudu loves you gif"
            className="loveGif"
          />

          <h1 className="gradientText">
            🎉 Hehehehe I know it, I Love You Too my baby❤️
          </h1>
          <h2 className="gradientText">Happy Valentine Day Guddi 💕</h2>
          <img
            src={myImage}
            alt=""
            style={{height:"200px",width:"200px"}}
            className="loveGif"
          />
        </div>
      )}
    </div>
  );
}

export default App;
