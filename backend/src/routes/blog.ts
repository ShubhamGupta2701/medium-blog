import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@shubhamgupta2701/medium-common";
import { z } from "zod"; // Importing Zod for schema validation

// Define Zod schema for publish date validation
const PublishDateSchema = z.string();

// Initialize Hono router
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
        userId : string;
    }
}>();

// Middleware for authentication
blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({ message: "User not logged in" });
        }
    } catch (e) {
        c.status(403);
        return c.json({ message: "User not logged in" });
    }
});

// GET all blogs endpoint
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.blog.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            publishDate: true, // Include publishDate in the select
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json(posts);
});

// GET single blog endpoint
blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.blog.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            id: true,
            title: true,
            content: true,
            publishDate: true, // Include publishDate in the select
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json(post);
});

// PUT update blog endpoint
blogRouter.put('/blog', async (c) => {
    const userId = c.get('userId');

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success, data } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({
            message: "Invalid input format",
        });
    }


    const updatedPost = await prisma.blog.update({
        where: {
            id: body.id,
            authorId: Number(userId)
        },
        data: {
            title: body.title,
            content : body.content,
            publishDate: new Date(), // Convert string to Date object
        }
    });

    return c.json(updatedPost);
});

// POST create blog endpoint
blogRouter.post('/', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success, data } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({
            message: "Invalid input format",
        });
    }

    const newPost = await prisma.blog.create({
        data: {
            title : body.title,
            content : body.content,
            publishDate : new Date(), // Convert string to Date object
            authorId: Number(userId)
        }
    });

    return c.json({
        message: "Post created successfully",
        id: newPost.id
    });
});
