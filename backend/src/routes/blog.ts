import { PrismaClient } from "@prisma/client/edge"; //  to perfrom operations on db
import { withAccelerate } from "@prisma/extension-accelerate";  // to accelerate speed of queries on db
import { Hono } from "hono"; // backend ke liye
import { verify } from "hono/jwt";  // to authenticate users
import { createBlogInput,updateBlogInput } from "@shubhamgupta2701/medium-common";  // zod validtions

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
        userId : string;
    }
}>();

blogRouter.use("/*",async(c,next)=>{   //middleware for all routes
	const authHeader = c.req.header("authorization") || "";  // to get jwt token from authorization
	try{
		const user = await verify(authHeader,c.env.JWT_SECRET);
		if(user){
			c.set("userId",user.id);
			await next();
		}else{
			c.status(403);
			return c.json({message:"User not logged in"});
		}
	}catch(e){
		c.status(403);
			return c.json({message:"User not logged in"});
		}
	
})

blogRouter.get('/bulk', async (c) => {   // by default yhi chlega 
	const prisma = new PrismaClient({  
		datasourceUrl: c.env?.DATABASE_URL	,   // prisma client create kra so that db pr operations perform krva ske
	}).$extends(withAccelerate());
	
	const posts = await prisma.blog.findMany({
		select:{
			id:true,
			content :true,
			title : true,
			author : {
				select : {
					name : true
				}
			}
		}
	});

	return c.json(posts);  // context se hi sb return hoga
})

blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.blog.findUnique({   //uniquely find krke return krvana h
		where: {
			id : Number(id)
		},
		select:{
			id:true,
			content :true,
			title : true,
			author : {
				select : {
					name : true
				}
			}
		}
	});

	return c.json(post);
})

blogRouter.put('/blog', async (c) => {
	const userId = c.get('userId');
	
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } =updateBlogInput.safeParse(body);
    if(!success){
		c.status(411);
		return c.json({
			message : "Inputs are wrong"
		})
    }
	prisma.blog.update({
		where: {
			id: body.id,
			authorId: Number(userId)
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});
blogRouter.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } =createBlogInput.safeParse(body);
    if(!success){
		c.status(411);
		return c.json({
			message : "Inputs are wrong"
		})
    }
	const post = await prisma.blog.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: Number(userId)
		}
	});
	return c.json({
		msg : "Post created sucessfully",
		id: post.id
	});
})
