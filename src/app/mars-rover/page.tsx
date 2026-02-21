"use client";

import React, { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  description?: string;
  categories: { id: number; title: string }[];
  geometries: {
    date: string;
    type: string;
    coordinates: number[];
  }[];
}

export default function EonetPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          "https://eonet.gsfc.nasa.gov/api/v2.1/events?limit=20&days=20&status=open"
        );

        if (!res.ok) throw new Error("Failed to fetch events");

        const json = await res.json();
        setEvents(json.events);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Natural Disaster Events (EONET)
      </h1>

      {loading && <div className="text-center text-gray-400">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((e) => (
          <div
            key={e.id}
            className="bg-[#101c3a] rounded-xl shadow-lg p-4 cursor-pointer"
            onClick={() => {
              setSelectedEvent(e);
              setModalOpen(true);
            }}
          >
            <div className="text-white font-semibold mb-2">{e.title}</div>

            <div className="text-gray-400 text-sm mb-2">
              {e.categories.map((c) => c.title).join(", ")}
            </div>

            <div className="text-gray-500 text-xs">
              {e.geometries[0]?.date}
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}