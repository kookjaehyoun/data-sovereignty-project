import express from 'express';
import pool from '../db/pool';

const router = express.Router();

// Submit new report
router.post('/', async (req, res) => {
  try {
    const { case_id, reporter_name, reporter_email, description, evidence } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const result = await pool.query(
      'INSERT INTO reports (case_id, reporter_name, reporter_email, description, evidence) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [case_id, reporter_name, reporter_email, description, evidence]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit report' });
  }
});

// Get reports for a case
router.get('/case/:case_id', async (req, res) => {
  try {
    const { case_id } = req.params;
    const result = await pool.query('SELECT * FROM reports WHERE case_id = $1', [case_id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

export default router;
