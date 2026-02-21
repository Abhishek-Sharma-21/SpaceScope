"use client";

import React, { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;

interface DonkiEvent {
  messageID: string;
  messageType: string;
  messageIssueTime: string;
  messageBody: string;
}

export default function DonkiPage() {
  const [events, setEvents] = useState<DonkiEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [startDate, setStartDate] = useState("2020-01-01");
  const [endDate, setEndDate] = useState("2026-01-10");
  const [type, setType] = useState("all");

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://api.nasa.gov/DONKI/notifications?startDate=${startDate}&endDate=${endDate}&type=${type}&api_key=${API_KEY}`
        );

        if (!res.ok) throw new Error("Failed to fetch DONKI events");

        const json = await res.json();
        setEvents(json);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [startDate, endDate, type]);

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        DONKI Space Weather Notifications
      </h1>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-[#101c3a] text-white px-3 py-2 rounded"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-[#101c3a] text-white px-3 py-2 rounded"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-[#101c3a] text-white px-3 py-2 rounded"
        >
          <option value="all">All</option>
          <option value="FLR">Solar Flare</option>
          <option value="CME">CME</option>
          <option value="GST">Geomagnetic Storm</option>
          <option value="SEP">Solar Energetic Particle</option>
          <option value="IPS">Interplanetary Shock</option>
          <option value="MPC">Magnetopause Crossing</option>
          <option value="RBE">Radiation Belt Enhancement</option>
        </select>
      </div>

      {/* STATES */}
      {loading && (
        <div className="text-center text-gray-400">Loading events...</div>
      )}

      {error && <div className="text-center text-red-500">{error}</div>}

      {/* GRID */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((e) => (
            <div
              key={e.messageID}
              className="bg-[#101c3a] rounded-xl shadow-lg p-4"
            >
              <div className="text-white font-semibold mb-2">
                {e.messageType}
              </div>

              <div className="text-gray-400 text-sm mb-2">
                {new Date(e.messageIssueTime).toLocaleString()}
              </div>

              <div className="text-gray-300 text-sm line-clamp-4">
                {e.messageBody}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && events.length === 0 && (
        <div className="text-center text-gray-400 mt-8">
          No events found for selected filters
        </div>
      )}
    </div>
  );
}