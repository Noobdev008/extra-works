'use strict';

const postSchema = `
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE IF NOT EXISTS posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(50) ,
        description VARCHAR(50) ,
        user_id UUID NOT NULL ,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
    );
`;

let db;
const Post = function(post) {
    this.title = post.title;
    this.description = post.description;
}

Post.init = async(_db) => {
    db = _db;
    await db.query(postSchema);
}

Post.create = (newPost, user_id) => {
    const query = {
        text: 'INSERT INTO posts (title, description, user_id) VALUES ($1, $2, $3) returning *',
        values: [newPost.title, newPost.description, user_id]
    }
    return db.query(query);
}

Post.add = (newPost) => {
    const query = {
        text: 'UPDATE TABLE posts SET title=$1, description=$2 where user_id = $3 returning *',
        values: [newPost.title, newPost.description, newPost],
    }
    return db.query(query);
}

Post.get = (post_id) => {
    const query = {
        text: 'select * from posts where id = $1',
        values: [post_id]
    }
    return db.query(query);
}


Post.update = (post_id, newPost) => {
    const query = {
        text: 'update posts set title=$1, description=$2 where id=$3 returning *',
        values: [newPost.title, newPost.description, post_id],
    }
    return db.query(query);
}

Post.delete = (id) => {
    const query = {
        text: 'delete from posts where id=$1 returning *',
        values: [id],
    }
    return db.query(query);
}

Post.getUserPosts = (user_id) => {
    const query = {
        text: 'select * from posts where user_id=$1;',
        values: [user_id]
    }

    return db.query(query);
}

module.exports = Post;