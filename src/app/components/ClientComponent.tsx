"use client";

import { useEffect } from "react";

export default function ClientComponent({ message }: { message: any }) {
  // Log message when component receives it
  useEffect(() => {
    console.log("Client component received message:", message);
  }, [message]); // Effect runs when 'message' prop changes

  return (
    <div>
      <h2>Client Component</h2>
    </div>
  );
}
