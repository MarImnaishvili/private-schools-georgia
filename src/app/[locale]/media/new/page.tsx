"use client";

import { useState } from "react";
import MediaManager, { MediaItem } from "@/components/forms/MediaManager";

export default function NewMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Call your API to save media, e.g. /api/media POST
    const response = await fetch("/api/media", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(media),
    });

    if (response.ok) {
      alert("Media saved successfully!");
      setMedia([]); // reset form
    } else {
      alert("Failed to save media");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Media</h1>
      <form onSubmit={handleSubmit}>
        <MediaManager media={media} onChange={setMedia} />
        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Media
        </button>
      </form>
    </div>
  );
}
