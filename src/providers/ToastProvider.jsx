// ToastProvider.jsx
import * as Toast from "@radix-ui/react-toast";
import { useState } from "react";

export default function ToastProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (msg) => {
    setMessage(msg);
    setOpen(true);
  };

  return (
    <Toast.Provider swipeDirection="right">
      {children(showToast)}

      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        duration={3000}
        style={{
          background: "white",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "12px 16px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        }}
      >
        <Toast.Title style={{ fontWeight: "bold", color: "#43B02A" }}>
          Sucesso
        </Toast.Title>
        <Toast.Description>{message}</Toast.Description>
      </Toast.Root>

      <Toast.Viewport
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
          maxWidth: "100%",
          zIndex: 9999,
        }}
      />
    </Toast.Provider>
  );
}
