import bg from "assets/icons/bg.svg";
import LoginForm from "./form";

export default function Login() {
  return (
    <div
      className="flex h-screen overflow-hidden items-center justify-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="text-xl font-bold text-center mb-10">
          意念精灵管理后台
        </div>
        <LoginForm />
      </div>

      <div className="w-full absolute bottom-2 h-6 flex items-center justify-center">
        <div className="text-white text-xs text-black/65">
          版权所有 © 2025 意念精灵MindSensor
        </div>
      </div>
    </div>
  );
}
