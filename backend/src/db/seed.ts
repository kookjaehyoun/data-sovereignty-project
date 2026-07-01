import pool from './pool';
import bcrypt from 'bcrypt';

export async function seed() {
  try {
    console.log('Starting database seeding...');

    // Seed admin user
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await pool.query(
      'INSERT INTO admins (username, password_hash) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [process.env.ADMIN_USERNAME || 'admin', hashedPassword]
    );

    // Seed sample cases
    const sampleCases = [
      {
        title: '안면인식 기술 부당 사용',
        description: '소수 민족 커뮤니티에 대한 무단 얼굴 데이터 수집',
        category: '안면인식',
        reported_by: '익명'
      },
      {
        title: '이동 경로 데이터 무단 판매',
        description: '앱 사용자의 이동 경로가 제3자에게 판매됨',
        category: '위치 추적',
        reported_by: '익명'
      }
    ];

    for (const caseData of sampleCases) {
      await pool.query(
        'INSERT INTO cases (title, description, category, reported_by) VALUES ($1, $2, $3, $4)',
        [caseData.title, caseData.description, caseData.category, caseData.reported_by]
      );
    }

    console.log('Seeding completed successfully');
    await pool.end();
  } catch (error) {
    console.error('Seeding failed:', error);
    await pool.end();
    process.exit(1);
  }
}

seed();
