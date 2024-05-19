import express from 'express';
import { signUp, signIn } from '../../controllers/auth';
import { validateBody, upload } from '../../middlewares';
import { userSchema } from '../../schemas';

const router = express.Router();

router.post('/signup', upload.single('avatar'), validateBody(userSchema.signUpSchema), signUp);
router.post('/signin', validateBody(userSchema.signInSchema), signIn);
// router.post('/signout', authenticate, signOut);
// router.get('/current', authenticate, current);
// router.patch('/avatars', authenticate, upload.single('avatar'), presentFile, updateAvatar);

export default router;