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
      // Run both queries in parallel
      const [linksResult, userResult] = await Promise.all([
        pool.query(
          `SELECT link_id, platform, url, position
           FROM user_links
           WHERE user_id = $1
           ORDER BY position ASC`,
          [userId]
        ),
        pool.query(
          `SELECT first_name, last_name, email, profile_image
           FROM users
           WHERE id = $1`,
          [userId]
        ),
      ]);
  
      const links = linksResult.rows.map((row) => ({
        linkId: row.link_id,
        details: {
          platform: row.platform,
          linkInput: row.url,
        },
      }));
  
      const user = userResult.rows[0] || {};
  
      res.status(200).json({
        user: {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          profileImage: user.profile_image,
        },
        links,
      });
    } catch (error) {
      console.error("Error fetching user data and links:", error);
      res.status(500).json({ message: "Error fetching user data" });
    }
  }

  export const updateUserProfile = async (req, res) => {
    try {
      const { first_name, last_name, imgURL } = req.body;
      const id= req.user.id
  
      if (!id) {
        return res.status(400).json({ error: "User ID is required" });
      }
  
      // Validate fields
      if (!first_name || !last_name) {
        return res
          .status(400)
          .json({ error: "First name and last name are required" });
      }
  
      // Build dynamic query based on what’s provided
      let query = `
        UPDATE users
        SET first_name = $1,
            last_name = $2
            ${imgURL ? ", profile_image = $3" : ""}
        WHERE id = $${imgURL ? 4 : 3}
        RETURNING id, first_name, last_name, profile_image;
      `;
  
      const values = imgURL
        ? [first_name, last_name, imgURL, id]
        : [first_name, last_name, id];
  
      const { rows } = await pool.query(query, values);
  
      if (rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({
        message: "Profile updated successfully",
        user: rows[0],
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
export const uploadProfileImage = async (req, res) => {
  try {
    const result = req.file;

    // 🧩 Validate file
    if (!result || !result.path) {
      return res.status(400).json({ error: "Image upload failed" });
    }

    // 🧠 Extract uploaded image URL from Cloudinary (or your upload middleware)
    const imageUrl = result.path;

    console.log(imageUrl);
    // ✅ Return Cloudinary URL — no database write here
    res.status(200).json({
      message: "Image uploaded successfully!",
      imageUrl, // frontend will later send this with other profile details
    });
  } catch (error) {
    console.log(error);
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

