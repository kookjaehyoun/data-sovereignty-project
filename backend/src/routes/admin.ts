import express from 'express';
import pool from '../db/pool';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, admin.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.encode({ id: admin.id, username: admin.username }, SECRET);
    res.json({ token, admin: { id: admin.id, username: admin.username } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get all reports (admin only)
router.get('/reports', authenticateAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reports ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// Update report status (admin only)
router.put('/reports/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query('UPDATE reports SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *', [status, id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update report' });
  }
});

// Delete report (admin only)
router.delete('/reports/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM reports WHERE id = $1', [id]);
    res.json({ message: 'Report deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete report' });
  }
});

// Get statistics (admin only)
router.get('/stats', authenticateAdmin, async (req, res) => {
  try {
    const totalCases = await pool.query('SELECT COUNT(*) FROM cases');
    const totalReports = await pool.query('SELECT COUNT(*) FROM reports');
    const pendingReports = await pool.query('SELECT COUNT(*) FROM reports WHERE status = \'pending\'');

    res.json({
      total_cases: parseInt(totalCases.rows[0].count),
      total_reports: parseInt(totalReports.rows[0].count),
      pending_reports: parseInt(pendingReports.rows[0].count)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Middleware to authenticate admin
function authenticateAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.decode(token, SECRET);
    (req as any).admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export default router;
