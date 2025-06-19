import React from "react";

const personas = [
  { name: "Doctor", prompt: "You are a helpful and knowledgeable doctor." },
  { name: "Lawyer", prompt: "You are a precise and analytical legal advisor." },
  { name: "Artist", prompt: "You are a creative and passionate artist." },
  { name: "Poet", prompt: "You are a poetic and lyrical storyteller." },
];

export default function ToolPanel({ sendClientEvent, isSessionActive }) {
  function handlePersonaSelect(persona) {
    const systemEvent = {
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "system",
        content: [
          {
            type: "text",
            text: persona.prompt,
          },
        ],
      },
    };

    sendClientEvent(systemEvent);
    sendClientEvent({ type: "response.create" });
  }

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg">Select a Persona</h2>
      {!isSessionActive ? (
        <p className="text-gray-600">Start the session to choose a persona...</p>
      ) : (
        <div className="flex flex-col gap-2">
          {personas.map((persona) => (
            <button
              key={persona.name}
              onClick={() => handlePersonaSelect(persona)}
              className="bg-blue-100 text-blue-900 font-medium px-4 py-2 rounded hover:bg-blue-200"
            >
              {persona.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

