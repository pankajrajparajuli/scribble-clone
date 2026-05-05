import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const prevPos = useRef({ x: 0, y: 0 });

  const [drawing, setDrawing] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    socketRef.current = io("http://localhost:5001", {
      transports: ["websocket", "polling"],
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    socket.on("draw", ({ x0, y0, x1, y1 }) => {
      drawLine(ctx, x0, y0, x1, y1);
    });

    return () => socket.disconnect();
  }, []);

  const joinRoom = () => {
    if (!roomId) return;

    socketRef.current.emit("join-room", roomId);
    setJoined(true);
  };

  const drawLine = (ctx, x0, y0, x1, y1) => {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();
  };

  const handleMouseDown = (e) => {
    setDrawing(true);

    const rect = canvasRef.current.getBoundingClientRect();
    prevPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleMouseMove = (e) => {
    if (!drawing || !joined) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const socket = socketRef.current;

    drawLine(
      canvasRef.current.getContext("2d"),
      prevPos.current.x,
      prevPos.current.y,
      x,
      y
    );

    socket.emit("draw", {
      roomId,
      data: {
        x0: prevPos.current.x,
        y0: prevPos.current.y,
        x1: x,
        y1: y,
      },
    });

    prevPos.current = { x, y };
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Scribble Clone (Rooms)</h2>

      {!joined ? (
        <div>
          <input
            placeholder="Enter room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <p>Joined room: {roomId}</p>
      )}

      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        style={{ border: "2px solid black", marginTop: "10px" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
}

export default App;