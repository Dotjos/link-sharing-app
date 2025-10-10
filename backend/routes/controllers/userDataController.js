import pool from "../../database.js";

export async function saveUserLinks(req, res) {
  try {
    const { id, linkdetails } = req.body;

    if (!id || !Array.isArray(linkdetails)) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    // Start transaction
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Delete old links for the user
      await client.query("DELETE FROM user_links WHERE user_id = $1", [id]);

      // Insert new links
      const insertQuery = `
  INSERT INTO user_links (user_id, link_id, platform, url, position)
  VALUES ($1, $2, $3, $4, $5)
`;

for (let i = 0; i < linkdetails.length; i++) {
  const { linkId, details } = linkdetails[i];
  const platform = details.platform?.platform || details.platform;
  const url = details.linkInput || "";
  await client.query(insertQuery, [id, linkId, platform, url, i]);
}


      await client.query("COMMIT");

      res.json({ message: "Links saved successfully" });
    } catch (err) {
      await client.query("ROLLBACK");
      console.error(err);
      res.status(500).json({ message: "Error saving links" });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

  export async function getUserLinks(req, res) {
    const { userId } = req.params;
  
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
  
    try {
      const result = await pool.query(
        `SELECT link_id, platform, url, position 
         FROM user_links 
         WHERE user_id = $1 
         ORDER BY position ASC`,
        [userId]
      );
  
      const links = result.rows.map((row) => ({
        linkId: row.link_id, // ✅ use stored linkId instead of new one
        details: {
          platform: row.platform,
          linkInput: row.url,
        },
      }));
  
      res.json({ links });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching user links" });
    }
  }
  