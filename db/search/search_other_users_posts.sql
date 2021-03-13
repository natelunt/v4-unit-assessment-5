SELECT p.id as post_id, title, content, img, profile_pic, date_created, username as author_username from helo_posts p
JOIN helo_users u on u.id = p.author_id
WHERE lower(title) LIKE $1
AND author_id != $2
ORDER BY date_created desc;