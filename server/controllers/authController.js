import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const users = []

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (users.find(u => u.email === email))
      return res.status(400).json({ message: 'User already exists' })
    const hashed = await bcrypt.hash(password, 10)
    const user = { id: Date.now().toString(), name, email, password: hashed }
    users.push(user)
    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user.id, name, email } })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = users.find(u => u.email === email)
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'Invalid credentials' })
    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user.id, name: user.name, email } })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}