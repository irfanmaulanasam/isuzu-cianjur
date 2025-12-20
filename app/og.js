// app/og.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export default function OG({params}) {
  return new ImageResponse(
    (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-green-500 p-8">
        <div className="flex flex-col items-center justify-center text-white">
          <h1 className="text-6xl font-bold">Isuzu Bahana Cianjur</h1>
          {params?.slug ? (
            <h2 className="text-4xl mt-4">{params.slug}</h2>
          ) : (
            <p className="text-3xl mt-4">Dealer Resmi Euro 4</p>
          )}
          <p className="text-2xl mt-8 opacity-90">DP Ringan • Cicilan Mudah</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  )
}
