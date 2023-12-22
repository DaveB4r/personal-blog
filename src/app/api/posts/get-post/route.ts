import pool from "../../../../database/db";
import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  try {
    let response = {
      id: "",
      user_id: "",
      title: "",
      category: "",
      date: "",
      content: "",
      image: "",
      state: "",
      slug: "",
      username: "",
      avatar: "",
    };
    const connection = await pool.getConnection();
    const { searchParams } = new URL(req.url);
    let slug = searchParams.get("slug");
    let id = searchParams.get("id");
    let query = `SELECT posts.*, username, users.image as avatar FROM posts LEFT JOIN users on posts.user_id = users.id WHERE `;
    if (slug) {
      slug = slug.replace(/'/g, "\\'").replace(/"/g, '\\"');
      query += `slug='${slug}'`;
    }
    if (id) {
      query += `posts.id='${id}'`;
    }
    const [post] = await connection.query(query);
    if (post.toString()) {
      response.id = post[0].id;
      response.user_id = post[0].user_id;
      response.title = post[0].title;
      response.category = post[0].category;
      response.date = post[0].date;
      response.content = post[0].content;
      response.image = post[0].image;
      response.state = post[0].status;
      response.slug = post[0].slug;
      response.username = post[0].username;
      response.avatar = post[0].avatar;
    }
    connection.release();
    return NextResponse.json(response);
  } catch (e) {
    console.error(e);
  }
}
