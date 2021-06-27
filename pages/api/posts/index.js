export default async function getPosts(req, res) {
  const secret = process.env.NOTION_API_KEY
  const database_id = process.env.NOTION_DATABASE_ID

  let headers = new Headers();
  headers.append("Authorization", `Bearer ${secret}`);
  headers.append("Notion-Version", "2021-05-13");
  headers.append("Content-Type", "application/json");

  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      page_size: 10,
      sorts: [
        {
          timestamp: "last_edited_time",
          direction: "descending"
        }
      ]
    }),
  };

  const response = await fetch(`https://api.notion.com/v1/databases/${database_id}/query`, options)
  const responseData = await response.json()
  
  // Filter posts by the published boolean field and change results schema to match the schema from the 
  // data/posts.js file
  const posts = responseData.results.filter(pageObj => pageObj.properties.published.checkbox).map(pageObj => {
    return {
      id: pageObj.id,
      title: pageObj.properties.title.title[0].plain_text,
      description: pageObj.properties.description.rich_text[0].plain_text,
      tags: pageObj.properties.tags.multi_select.map(notionTag => notionTag.name),
      image: pageObj.properties.image.url,
      slug: pageObj.properties.slug.rich_text[0].plain_text,
      date: pageObj.properties.date.last_edited_time,
    }
  })
  
  res.status(200).json(posts)
}