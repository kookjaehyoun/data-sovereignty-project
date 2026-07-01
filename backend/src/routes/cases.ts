import express from 'express';
import pool from '../db/pool';

const router = express.Router();

// Get all cases
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cases ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cases' });
  }
});

// Get single case
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM cases WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch case' });
  }
});

export default router;
