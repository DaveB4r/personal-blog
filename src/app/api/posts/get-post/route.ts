import pool from "@/database/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
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
      number_comments: "",
      comments: "",
      comment_usernames: "",
    };
    const connection = await pool.getConnection();
    const { searchParams } = new URL(req.url);
    let slug = searchParams.get("slug");
    let id = searchParams.get("id");
    let query = `SELECT posts.*, users.username, users.image as avatar, GROUP_CONCAT(comments.comment_text SEPARATOR '|-|') AS comments, COUNT(comments.id) AS number_comments, GROUP_CONCAT(comment_users.username SEPARATOR '|-|') AS comment_usernames FROM posts LEFT JOIN users ON posts.user_id = users.id LEFT JOIN comments ON posts.id = comments.post_id LEFT JOIN users AS comment_users ON comments.user_id = comment_users.id WHERE `;
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
      response.number_comments = post[0].number_comments;
      response.comments = post[0].comments;
      response.comment_usernames = post[0].comment_usernames;
    }
    connection.release();
    return NextResponse.json(response);
  } catch (e) {
    console.error(e);
  }
}
