import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import {cors} from 'hono/cors'

export const app = new Hono<{
  Bindings: {
      DATABASE_URL: string; // prisma vala url hit hoga isme
      JWT_SECRET: string;  // authentication ke liye
  }
}>();
app.use('/*',cors()); // middleware - ye vo predefined functions hoty h jo hmesha run hoge allover  // add
app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app;