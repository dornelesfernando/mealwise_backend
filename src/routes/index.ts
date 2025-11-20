import { Router } from 'express';
import userRoutes from '../modules/user/user.routes.js';
import taskRoutes from '../modules/task/task.routes.js';
import projectRoutes from '../modules/project/project.routes.js';
import positionRoutes from '../modules/position/position.routes.js';
import attachmentRoutes from '../modules/attachment/attachment.routes.js';
import hourLogRoutes from '../modules/hourLog/hourLog.routes.js';
import permissionRoutes from '../modules/permission/permission.routes.js';
import roleRoutes from '../modules/role/role.routes.js';
import rolePermissionRoutes from '../modules/rolePermission/rolePermission.routes.js';
import userRoleRoutes from '../modules/userRole/userRole.routes.js';
import userTaskRoutes from '../modules/userTask/userTask.routes.js';
import departmentRoutes from '../modules/department/department.routes.js';

import authRoutes from '../modules/auth/auth.routes.js';

const mainRouter = Router();

// Models
mainRouter.use('/users', userRoutes);
mainRouter.use('/tasks', taskRoutes);
mainRouter.use('/projects', projectRoutes);
mainRouter.use('/positions', positionRoutes);
mainRouter.use('/attachments', attachmentRoutes);
mainRouter.use('/hourLogs', hourLogRoutes);
mainRouter.use('/permissions', permissionRoutes);
mainRouter.use('/roles', roleRoutes);
mainRouter.use('/rolePermissions', rolePermissionRoutes);
mainRouter.use('/userRoles', userRoleRoutes);
mainRouter.use('/userTasks', userTaskRoutes);
mainRouter.use('/departments', departmentRoutes);

mainRouter.use('/auth', authRoutes);

export default mainRouter;
