import Sidebar from "components/sidebar";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAdminAppStore from "store/app";
import { sysItems } from "../router";
import HomeHeader from "./header";
import { useStaffStore } from "store/staff";
export default function Home() {
  const setAppHeight = useAdminAppStore((state) => state.setAppHeight);
  const navItems = useStaffStore((s) => s.navItems());
  useEffect(() => {
    const rf = () => {
      const app = document.getElementById("app");
      console.log("height", app?.clientHeight);
      setAppHeight(app?.clientHeight || 1080);
    };
    window.addEventListener("resize", rf);
    return () => {
      window.removeEventListener("resize", rf);
    };
  }, []);

  return (
    <div className="h-screen w-screen" id="app">
      <HomeHeader />
      <div className="flex w-full h-[calc(100%-48px)]">
        {/* width: 200px */}
        <Sidebar items={navItems} />
        <div className="w-[calc(100%-200px)] h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
