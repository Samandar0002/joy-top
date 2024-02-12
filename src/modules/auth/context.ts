import { createContext } from 'react';

import { Types } from 'modules/auth';

const AuthContext = createContext<Types.IContext>({} as Types.IContext);

export default AuthContext;
