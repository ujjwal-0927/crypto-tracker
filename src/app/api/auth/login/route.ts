import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const HASHED_PASSWORD = bcrypt.hashSync('cryptoplatform123', 10);

const MOCK_USERS = [
  {
    id: '1',
    email: 'test@crypto.com',
    password: HASHED_PASSWORD
  }
];

const JWT_SECRET = 'mySecretKeyIsASecret';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = MOCK_USERS.find(u => u.email === email);

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' }, 
        { status: 401 }
      );
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid email or password' }, 
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email 
      }, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );

    return NextResponse.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email 
      } 
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}