import type { DrawerEvents } from '@drawer/types/drawerEvents';

function pubSub<T>() {
  const subscriptions = new Map<keyof T, (args: any) => void>();

  return {
    on<Key extends keyof T>(event: Key, callback: (args: T[Key]) => void) {
      subscriptions.set(event, callback);
    },
    emit<Key extends keyof T>(event: Key, data?: T[Key]) {
      const cb = subscriptions.get(event);
      cb?.(data);
    },
    off(event: keyof T) {
      subscriptions.delete(event);
    },
    clear() {
      subscriptions.clear();
    },
  };
}

const drawerPubSub = pubSub<DrawerEvents>();

export default drawerPubSub;
