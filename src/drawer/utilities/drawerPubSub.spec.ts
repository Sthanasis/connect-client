import { DrawerEvents } from '@drawer/constants';
import drawerPubSub from '@drawer/utilities/drawerPubSub';
import { afterAll, describe, expect, it, vi } from 'vitest';

describe('Drawer pub sub', () => {
  afterAll(() => {
    drawerPubSub.clear();
  });
  it('Responds to close drawer events', () => {
    const fn = vi.fn();
    drawerPubSub.on(DrawerEvents.CLOSE, fn);
    drawerPubSub.emit(DrawerEvents.CLOSE);
    expect(fn).toHaveBeenCalled();
  });
  it('Responds to is dragging event', () => {
    const fn = vi.fn();
    drawerPubSub.on(DrawerEvents.IS_DRAGGING, fn);
    drawerPubSub.emit(DrawerEvents.IS_DRAGGING, true);
    expect(fn).toHaveBeenCalledWith(true);
  });
  it('Responds to translate event', () => {
    const fn = vi.fn();
    drawerPubSub.on(DrawerEvents.TRANSLATE, fn);
    drawerPubSub.emit(DrawerEvents.TRANSLATE, 50);
    expect(fn).toHaveBeenCalledWith(50);
  });
  it('Responds to change height step event', () => {
    const fn = vi.fn();
    drawerPubSub.on(DrawerEvents.CHANGE_HEIGHT_STEP, fn);
    drawerPubSub.emit(DrawerEvents.CHANGE_HEIGHT_STEP, 50);
    expect(fn).toHaveBeenCalledWith(50);
  });
});
