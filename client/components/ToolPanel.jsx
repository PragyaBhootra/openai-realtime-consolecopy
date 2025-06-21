import { User } from "react-feather";
import Button from "./Button";

const personas = [
  { name: "Doctor", prompt: "You are a helpful and knowledgeable doctor assistant." },
  { name: "Lawyer", prompt: "You are a precise and analytical legal advisor." },
  { name: "Artist", prompt: "You are a creative and imaginative artist." },
  { name: "Poet", prompt: "You are a poetic and lyrical storyteller keep your poems short" },
  { name: "Teacher", prompt: "You are a patient and clear educator." },
];

export default function ToolPanel({ isSessionActive, sendTextMessage }) {
  function handlePersonaClick(prompt) {
    sendTextMessage(prompt);
  }

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg">Select a Persona</h2>

      {!isSessionActive ? (
        <p className="text-gray-600">Start a session to choose a persona...</p>
      ) : (
        <div className="flex flex-col gap-2">
          {personas.map((persona) => (
            <Button
              key={persona.name}
              onClick={() => handlePersonaClick(persona.prompt)}
              icon={<User height={16} />}
              className="bg-blue-100 text-blue-900 font-medium hover:bg-blue-200"
            >
              {persona.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

