import { SystemUser } from "types/system_user";
import { NavItem, orgItems, sysItems } from "pages/router";
import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { Org } from "types/org";
import { ModalState } from "lib/state";
interface State {
  user: SystemUser | null;
  type: "system" | "org";
  curr: SystemUser | null;
  drawerState: ModalState;
  page: number;
  pageSize: number;
}

const initState: State = {
  user: null,
  type: "system",
  curr: null,
  drawerState: "close",
  page: 1,
  pageSize: 10,
};

interface Actions {
  setUser: (u: SystemUser) => void;
  org: () => Org | undefined;
  setDrawerState: (state: ModalState) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setCurr: (curr: SystemUser) => void;
  navItems: () => NavItem[];
}

export const useStaffStore = createWithEqualityFn<State & Actions>()(
  persist(
    (set, get) => ({
      ...initState,
      setUser(u: SystemUser) {
        if (u.org?.id) {
          set({ user: u, type: "org" });
        } else {
          set({ user: u, type: "system" });
        }
      },
      navItems() {
        let orgType = get().type;
        switch (orgType) {
          case "org":
            return orgItems;
          case "system":
            return sysItems;
          default:
            return [];
        }
      },
      org() {
        return get().user?.org;
      },
      setDrawerState(state: ModalState) {
        set({ drawerState: state });
      },
      setPage(page: number) {
        set({ page });
      },
      setPageSize(pageSize: number) {
        set({ pageSize });
      },
      setCurr(curr: SystemUser) {
        set({ curr });
      },
    }),
    {
      name: "staff",
      version: 3,
    }
  ),
  shallow
);
