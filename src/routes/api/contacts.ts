import express from 'express';
import { getAll, getById, add, deleteById, updateById, updateAvatarById } from '../../controllers/contacts';
import { authenticate, isValidId, validateBody, upload } from '../../middlewares';
import { contactSchema, validBodySchema } from '../../schemas';

const router = express.Router();

router.use(authenticate);

router.get('/', getAll);
router.get('/:contactId', isValidId, getById);
router.post('/', upload.single('avatar'), validateBody(contactSchema.addSchema), add);
router.delete('/:contactId', isValidId, authenticate, deleteById);
router.put('/:contactId', isValidId, validateBody(validBodySchema), updateById);
router.patch('/:contactId/favorite', isValidId, validateBody(contactSchema.updateStatusContactSchema), updateById);
router.patch('/:contactId/avatar', authenticate, isValidId, upload.single('avatar'), updateAvatarById);

export default router;
