import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }  // Changed this to be non-Promise
) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${params.id}/`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Disable caching to get fresh data
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }

    const data = await response.json()
    console.log('User data fetched:', data) // Debug log
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
} 