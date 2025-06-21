import { User } from "react-feather";
import Button from "./Button";

export default function ToolPanel({ isSessionActive, sendTextMessage }) {
  function handleDoctorClick() {
    sendTextMessage("You are a doctor assistant. Please help me with medical queries.");
  }

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg">Quick Actions</h2>

      {!isSessionActive ? (
        <p className="text-gray-600">Start a session to use quick actions...</p>
      ) : (
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleDoctorClick}
            icon={<User height={16} />}
            className="bg-green-600 text-white"
          >
            doctor
          </Button>
        </div>
      )}
    </div>
  );
}

