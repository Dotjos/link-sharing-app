import cloudinary from "../../cloudinaryConfig.js";
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
      const { first_name, last_name } = req.body;
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
        WHERE id = $3
        RETURNING id, first_name, last_name
      `;
  
      const values =  [first_name, last_name, id];
  
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
  


export const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user?.id;
    const file = req.file;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (!file || !file.path) {
      return res.status(400).json({ error: "Image upload failed" });
    }

    // Get current image from DB (to delete later if exists)
    const { rows: oldUserRows } = await pool.query(
      "SELECT profile_image FROM users WHERE id = $1",
      [userId]
    );

    if (oldUserRows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const oldImageUrl = oldUserRows[0]?.profile_image;
    const newImageUrl = file.path; // Cloudinary secure URL

    // ✅ Delete old image from Cloudinary if it exists
    if (oldImageUrl) {
      try {
        // Extract public ID from the URL (e.g. user_profiles/abc123)
        const parts = oldImageUrl.split("/");
        const fileName = parts.pop(); // e.g. abc123.jpg
        const folderName = parts.slice(-2, -1)[0]; // e.g. user_profiles
        const publicId = `${folderName}/${fileName.split(".")[0]}`;

        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.warn("Failed to delete old image from Cloudinary:", err.message);
      }
    }

    // ✅ Update DB with new image URL
    const updateQuery = `
      UPDATE users
      SET profile_image = $1
      WHERE id = $2
      RETURNING id, first_name, last_name, email, profile_image;
    `;
    const { rows } = await pool.query(updateQuery, [newImageUrl, userId]);

    res.status(200).json({
      message: "Profile image updated successfully",
      user: rows[0],
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


