
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput,updateBlogInput } from "@shubhamgupta2701/medium-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
        userId : string;
    }
}>();

blogRouter.use("/*",async(c,next)=>{
	const authHeader = c.req.header("authorization") || "";
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

blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
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

	return c.json(posts);
})

blogRouter.get('blog/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.blog.findUnique({
		where: {
			id : Number(id)
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
