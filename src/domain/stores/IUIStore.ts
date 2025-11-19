type UIStoreState = {
  hideName: boolean;
};

type UIStoreActions = {
  toggleHideName: () => void;
};

type IUIStore = UIStoreState & UIStoreActions;

export type { IUIStore };
