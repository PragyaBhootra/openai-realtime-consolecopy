import React from "react";

/**
 * Extracts human-readable text from supported events.
 */
function getMessageFromEvent(event) {
  // Assistant streaming response (token)
  if (event.type === "response.content_part.added" && event.delta?.text) {
    return { role: "assistant", text: event.delta.text };
  }

  // Assistant final structured output
  if (event.type === "response.output_item.added" && event.item?.content) {
    const text = event.item.content
      .map((c) => c?.text?.value || c?.transcript || "[non-text]")
      .join(" ");
    return { role: "assistant", text };
  }

  // ✅ Assistant voice transcript
  if (event.type === "response.audio_transcript.done" && event.transcript) {
    return { role: "assistant", text: event.transcript };
  }

  return null;
}

/**
 * Renders a cleaned-up conversation log with only assistant responses.
 */
export default function EventLog({ events }) {
  return (
    <div className="flex flex-col-reverse gap-2 px-2">
      {events.map((event, idx) => {
        const message = getMessageFromEvent(event);
        if (!message || message.role !== "assistant") return null;

        return (
          <div
            key={idx}
            className="p-2 rounded-lg shadow-sm max-w-xl bg-green-50 text-green-900 self-end"
          >
            <strong>🤖 AI:</strong> {message.text}
          </div>
        );
      })}
    </div>
  );
}





