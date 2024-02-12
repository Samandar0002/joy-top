import { config } from 'config';

import store2 from 'store2';

export const session = {
  set: (token: string) => store2.set(config.tokenKEY, token)!,
  get: () => store2.get(config.tokenKEY)!,
  delete: () => store2.remove(config.tokenKEY)!
};
export const sessionPhone = {
  set: (phone: string) => store2.set(config.phoneKEY, phone)!,
  get: () => store2.get(config.phoneKEY)!,
  delete: () => store2.remove(config.phoneKEY)!
};
