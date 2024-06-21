import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/utils/jwt/jwt";
import {signupInput,signinInput} from "@shubhamgupta2701/medium-common"


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    const body = await c.req.json(); // inputs context se nikal li
    const { success } =signupInput.safeParse(body); // yha pr zod inputs validate krega 
    
    if(!success){    // check kr rha h ki inputs sahi ayi h ya nhi 
      c.status(411);
      return c.json({
        message : "Inputs are wrong"
      })
    }

    // yha tk agya mtlb inputs validate h mtlb correct type ki h
    const prisma = new PrismaClient({ // new client to access db 
      datasourceUrl: c.env?.DATABASE_URL,  // 
    }).$extends(withAccelerate());
  
    
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name:body.name,
      },
    });
    console.log(user);
    const token = await sign({ id: user.id }, c.env.JWT_SECRET) // cross verification ke liye token 
    console.log(token)
    return c.json({
      jwt: token // return kr rhe h token ko 
    })
})
  
userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message : "Inputs are wrong, can't login"
      })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    
    const user = await prisma.user.findUnique({  // to find user using inputs
        where: {
            email: body.email,
            password: body.password
        }
    });

    if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token:jwt,msg : "login successful"});
})
